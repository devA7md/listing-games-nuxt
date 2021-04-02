<template>
  <div>
    <h2 class="text-3xl sm:text-4xl text-gray-600 my-6 uppercase">
      {{ title }}
    </h2>

    <div
      v-if="games.length > 0 && !loading && !error"
      class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
    >
      <Card
        v-for="game in games"
        :key="game.id"
        data-testid="card"
        class="cursor-pointer hover:shadow-2xl"
        @click.native="previewDetails(game)"
      >
        <template #title>
          <h2 data-testid="card-title" class="text-xl text-gray-500 line-clamp">
            {{ game.title }}
          </h2>
        </template>
        <template #content>
          <p data-testid="card-body" class="text-justify text-gray-500">
            {{ game.body }}
          </p></template
        >
        <template #footer>
          <div class="flex justify-end">
            <i class="pi pi-angle-right text-lg text-gray-500"></i>
          </div>
        </template>
      </Card>
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
import { IRecommendedGame } from '@/types/games.types'

const CardGridProps = Vue.extend({
  props: {
    title: String,
    games: Array,
    loading: Boolean,
    error: String,
  },
})

@Component
export default class CardsGrid extends CardGridProps {
  previewDetails(game: IRecommendedGame) {
    this.$store.commit('games/setSelectedGame', game)
    this.$router.push({ name: 'game-id', params: { id: game.id } })
    if (Object.keys(this.$route.params).length > 0) window.scrollTo(0, 0)
  }
}
</script>
