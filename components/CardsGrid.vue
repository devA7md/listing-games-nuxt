<template>
  <div class="sec-bg p-5">
    <div class="flex items-center justify-between">
      <h2 class="text-xl text-gray-600 my-6 uppercase">
        {{ title }}
      </h2>

      <div
        v-if="displaySeeAll"
        class="flex items-center cursor-pointer text-sm"
        @click="viewAll"
      >
        <p class="uppercase">See All</p>
        <i class="pi pi-angle-right text-gray-500"></i>
      </div>
    </div>

    <div
      v-if="games.length > 0 && !loading && !error"
      class="flex justify-between flex-wrap"
    >
      <div
        v-for="game in games"
        :key="game.id"
        data-testid="card"
        class="game-card mx-2 my-5 flex-1"
        :style="{ flexBasis: '125px' }"
      >
        <div
          class="bg-gray-100 rounded-lg"
          :style="{ height: '100px', width: '100%' }"
        ></div>
        <h2
          data-testid="card-title"
          class="text-md text-gray-500 my-2 line-clamp"
        >
          {{ game.title }}
        </h2>
        <Button
          label="More Info"
          class="mb-1"
          @click="previewDetails(game)"
        ></Button>
      </div>
    </div>

    <Message
      v-if="error && !loading"
      data-testid="error"
      severity="error"
      :closable="false"
      >{{ error }}
    </Message>

    <div
      data-testid="loading"
      class="flex justify-center"
      v-if="loading && !error"
    >
      <ProgressSpinner style="width: 50px; height: 50px" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { IGame } from '~/types/games.types'

const CardGridProps = Vue.extend({
  props: {
    title: String,
    games: Array,
    loading: { type: Boolean, default: false },
    error: { type: String, default: null },
    displaySeeAll: {
      type: Boolean,
      default: true,
    },
  },
})

@Component
export default class CardsGrid extends CardGridProps {
  previewDetails(game: IGame) {
    this.$store.commit('games/setSelectedGame', game)
    this.$router.push({ name: 'game-id', params: { id: game.id } })
    if (Object.keys(this.$route.params).length > 0) window.scrollTo(0, 0)
  }

  viewAll() {
    this.$router.push({
      name: 'category-id',
      params: { id: this.$store.state.games.currentCategoryName },
    })
  }
}
</script>

<style>
.game-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
}
</style>
