<template>
  <div>
    <h2 class="text-3xl sm:text-4xl text-gray-600 my-6 uppercase">
      Categories
    </h2>
    <Carousel
      v-if="!error && !loading"
      :value="categories && Object.keys(categories)"
      :numVisible="4"
      :numScroll="3"
      :responsive-options="responsiveOptions"
      :circular="true"
      :autoplayInterval="3000"
    >
      <template #item="slotProps">
        <NuxtLink :to="{ name: 'category-id', params: { id: slotProps.data } }">
          <div
            class="bg-gray-200 text-gray-400 text-right p-6 m-0.5 sm:m-1 cursor-pointer h-56"
          >
            <p class="text-9xl">{{ slotProps.data }}</p>
            <p class="text-xl">Category</p>
          </div>
        </NuxtLink>
      </template>
    </Carousel>

    <div v-else-if="loading && !error" class="flex justify-center">
      <ProgressSpinner style="width: 50px; height: 50px" />
    </div>

    <Message v-else-if="error && !loading" severity="error" :closable="false"
      >{{ error }}
    </Message>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import {
  fetchAndCategorizeGames,
  handleAxiosError,
} from '@/services/games.services'

@Component
export default class Categories extends Vue {
  categories = {}
  loading = false
  error = ''
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 2,
    },
    {
      breakpoint: '640px',
      numVisible: 2,
      numScroll: 1,
    },
  ]

  get cat() {
    return this.$store.state.games.categories
  }

  async created() {
    const cat = this.cat
    if (Object.keys(cat).length > 0) {
      return (this.categories = cat)
    }
    try {
      this.loading = true
      const categorizedGames = await fetchAndCategorizeGames()
      this.categories = categorizedGames
      await this.$store.commit('games/setCategories', categorizedGames)
    } catch (error) {
      this.error = handleAxiosError(error, "Couldn't fetch categories")
    } finally {
      this.loading = false
    }
  }
}
</script>
