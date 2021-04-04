<template>
  <div class="sec-bg">
    <div v-if="game" class="flex flex-col sm:flex-row">
      <div
        class="bg-gray-100 text-gray-300 flex justify-center items-center"
        style="min-height: 250px; flex: 2"
      >
        Image
      </div>
      <div class="flex-1 flex flex-col justify-between p-5">
        <h2 class="text-2xl text-gray-600 line-clamp">{{ game.title }}</h2>
        <div class="flex-1 py-2">
          <p class="text-md text-gray-400">{{ game.body }}</p>
        </div>
        <Button
          @click="previewDetails(game)"
          class="mb-1"
          label="More Info"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { IGame } from '@/types/games.types'

@Component({
  watch: {
    currentCategories(categories) {
      ;(this as any).game = categories[0]
    },
  },
})
export default class FeaturedGame extends Vue {
  game: IGame | null = null
  error: string | null = null

  get currentCategories(): IGame[] {
    return this.$store.state.games.currentCategories
  }

  mounted(): void {
    this.game = this.currentCategories[0]
  }

  previewDetails(game: IGame): void {
    this.$store.commit('games/setFeaturedGame', game)
    this.$router.push({ name: 'game-id', params: { id: game.id } })
  }
}
</script>
