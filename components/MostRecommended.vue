<template>
  <CardsGrid
    :error="error"
    :loading="loading"
    title="Most Recommended"
    :games="games"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { IRecommendedGame } from '@/types/games.types'
import Component from 'vue-class-component'
import { Subscription } from 'rxjs'
import {
  fetchAndTransformGames,
  handleAxiosError,
  injectSomeData,
  mostRecommendedFilter,
} from '@/services/games.services'

@Component
export default class MostRecommended extends Vue {
  games$: Subscription | null = null
  games: IRecommendedGame[] = []
  loading: boolean = false
  error: string | null = null

  get recommended() {
    return this.$store.state.games.recommended
  }

  async created() {
    if (this.recommended.length > 0) {
      return (this.games = this.recommended)
    }

    this.loading = true
    this.games$ = await fetchAndTransformGames(
      injectSomeData,
      mostRecommendedFilter,
      6
    ).subscribe(
      (games: IRecommendedGame[]) => {
        this.games = games
        this.$store.commit('games/setRecommended', games)
        this.loading = false
        this.error = null
      },
      (error) => {
        this.error = handleAxiosError(error, "Couldn't fetch recommended games")
        this.loading = false
      }
    )
  }

  destroyed() {
    if (this.games$) this.games$.unsubscribe()
  }
}
</script>
