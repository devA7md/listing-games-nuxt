<template>
  <CardsGrid
    :error="error"
    :loading="loading"
    title="Most Recommendation"
    :games="games"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { IGame } from '@/types/games.types'
import Component from 'vue-class-component'
import {
  fetchAndCategorizeGames,
  handleAxiosError,
} from '~/services/games.services'

@Component({
  watch: {
    currentCategories(categories) {
      ;(this as any).games = categories.slice(0, 5)
    },
  },
})
export default class MostRecommendation extends Vue {
  games: IGame[] = []
  loading: boolean = false
  error: string | null = null

  get currentCategories() {
    return this.$store.state.games.currentCategories
  }

  get storeCategories() {
    return this.$store.state.games.categories
  }

  async created(): Promise<void> {
    if (Object.keys(this.storeCategories).length > 0) {
      this.games = this.currentCategories.slice(0, 5)
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
