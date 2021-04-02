<template>
  <div>
    <CardsGrid
      :error="error"
      :loading="loading"
      :title="`Games for category ${$route.params.id}`"
      :games="games"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import {
  fetchAndCategorizeGames,
  handleAxiosError,
} from '@/services/games.services'
import Component from 'vue-class-component'
import { IGame } from '~/types/games.types'

@Component
export default class CategoryPreview extends Vue {
  games: IGame[] = []
  loading: boolean = false
  error: string | null = null

  get categories() {
    return this.$store.state.games.categories
  }

  async mounted() {
    const categories = this.categories[this.$route.params.id]
    if (categories) {
      this.games = categories
    } else {
      try {
        this.loading = true
        this.games = (await fetchAndCategorizeGames())[this.$route.params.id]
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
