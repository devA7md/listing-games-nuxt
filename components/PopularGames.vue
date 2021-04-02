<template>
  <CardsGrid
    :error="error"
    :loading="loading"
    title="Most Popular"
    :games="games"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { IModifiedGame } from '@/types/games.types'
import { Subscription } from 'rxjs'
import Component from 'vue-class-component'
import {
  fetchAndTransformGames,
  handleAxiosError,
  injectSomeData,
  mostPopularFilter,
} from '@/services/games.services'

@Component
export default class PopularGames extends Vue {
  games$: Subscription | null = null
  games: IModifiedGame[] = []
  loading: boolean = false
  error: string | null = null

  get popular() {
    return this.$store.state.games.popular
  }

  mounted(): void {
    if (this.popular.length > 0) {
      return (this.games = this.popular)
    }

    this.loading = true
    this.games$ = fetchAndTransformGames(
      injectSomeData,
      mostPopularFilter,
      4
    ).subscribe(
      (games: IModifiedGame[]) => {
        this.games = games
        this.$store.commit('games/setPopular', games)
        this.loading = false
        this.error = null
      },
      (error) => {
        this.error = handleAxiosError(error, "Couldn't fetch popular games")
        this.loading = false
      }
    )
  }

  destroyed(): void {
    if (this.games$) this.games$.unsubscribe()
  }
}
</script>
