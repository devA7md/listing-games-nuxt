<template>
  <div>
    <h1 class="text-4xl text-gray-500 uppercase pb-4">Game Details</h1>

    <div v-if="game && !loading" class="bg-white rounded shadow-lg p-4">
      <h2 class="text-3xl text-gray-700">{{ game.title }}</h2>
      <h4 class="text-md text-gray-600">{{ game.body }}</h4>
    </div>

    <div v-else-if="loading" class="flex justify-center">
      <ProgressSpinner style="width: 50px; height: 50px" />
    </div>

    <p
      v-else-if="error && !loading"
      class="bg-red-100 rounded border-red-400 text-gray-500 p-5 text-center"
    >
      {{ error }}
    </p>

    <div class="my-20">
      <MostRecommended />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Subscription } from 'rxjs'
import Component from 'vue-class-component'
import { URL } from '@/constants/general'
import { handleAxiosError } from '@/services/games.services'

@Component
export default class GameDetails extends Vue {
  game: Subscription | null = null
  loading: boolean = false
  error: string | null = null

  get selectedGame() {
    return this.$store.state.games.selectedGame
  }

  async created() {
    if (this.selectedGame) {
      this.game = this.selectedGame
    } else {
      this.loading = true
      try {
        const res = await this.$axios.get(
          URL + '/posts/' + this.$route.params.id
        )
        this.game = res.data
        this.error = null
      } catch (error) {
        this.error = handleAxiosError(error, "Couldn't fetch recommended games")
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
