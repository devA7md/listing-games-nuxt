<template>
  <div class="py-10">
    <CardsGrid
      :error="error"
      :loading="loading"
      :title="`Games for category ${$route.params.id}`"
      :games="games"
      :displaySeeAll="false"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { IGame } from '~/types/games.types'
import {
  fetchAndCategorizeGames,
  handleAxiosError,
} from '~/services/games.services'

@Component({
  watch: {
    currentCategories(categories) {
      ;(this as any).games = categories
    },
  },
})
export default class CategoryPreview extends Vue {
  games: IGame[] = []
  loading: boolean = false
  error: string | null = null

  get currentCategories() {
    return this.$store.state.games.currentCategories
  }

  get storeCategories() {
    return this.$store.state.games.categories
  }

  async mounted(): Promise<void> {
    if (Object.keys(this.storeCategories).length > 0) {
      this.games = this.currentCategories
    } else {
      try {
        this.loading = true
        const categorizedGames = await fetchAndCategorizeGames()
        const categoryName = Object.keys(categorizedGames)[0].toString()
        await this.$store.commit('games/setCategories', categorizedGames)
        this.$store.commit('games/setCurrentCategoryName', categoryName)
        this.$store.commit(
          'games/setCurrentCategories',
          categorizedGames[+categoryName]
        )
        this.error = null
      } catch (error) {
        this.error = handleAxiosError(error, "Couldn't fetch categories")
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
