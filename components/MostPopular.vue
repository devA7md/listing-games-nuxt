<template>
  <CardsGrid
    :error="null"
    :loading="false"
    title="Most Popular"
    :games="games"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { IGame } from '@/types/games.types'
import Component from 'vue-class-component'

@Component({
  watch: {
    currentCategories(categories) {
      ;(this as any).games = categories.slice(0, 5)
    },
  },
})
export default class MostPopular extends Vue {
  games: IGame[] = []

  get currentCategories() {
    return this.$store.state.games.currentCategories
  }

  mounted(): void {
    this.games = this.currentCategories.slice(0, 5)
  }
}
</script>
