<template>
  <div class="relative">
    <InputText
      v-model="value"
      type="text"
      placeholder="Search a game..."
      :style="{ width: '100%' }"
      @keyup="search"
    />
    <div
      v-if="filtered.length > 0"
      class="absolute top-15 bg-white shadow-lg border-2 border-gray-200 rounded z-50"
    >
      <p
        v-for="game in filtered"
        :key="game.id"
        class="px-1 py-2 hover:bg-gray-50 cursor-pointer"
        @click="previewDetails(game)"
      >
        {{ game.title }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { from } from 'rxjs'
import { bufferCount, defaultIfEmpty, filter, take } from 'rxjs/operators'
import { URL } from '~/constants/general'
import { IGame } from '~/types/games.types'
import { handleAxiosError } from '~/services/games.services'

@Component
export default class SearchGame extends Vue {
  value: string | null = null
  filtered: IGame[] = []
  games: IGame[] = []
  error: string | null = null

  async created() {
    const stateGames = this.$store.state.games.searchedGames
    if (stateGames.length > 0) {
      return (this.games = stateGames)
    }
    try {
      const response = await this.$axios.get(URL + '/posts')
      this.games = response.data
      this.$store.commit('games/setSearchedGames', response.data)
    } catch (error) {
      this.error = handleAxiosError(
        error,
        'Something went wrong with searching'
      )
    }
  }

  search(event: any) {
    const text = event.target.value
    if (text.length === 0) return (this.filtered = [])
    from(this.games)
      .pipe(
        filter((game: any) =>
          game.title.toLowerCase().startsWith(text.toLowerCase())
        ),
        defaultIfEmpty([]),
        bufferCount(7),
        take(1)
      )
      .subscribe((games: any) => {
        this.filtered = games
      })
  }

  previewDetails(game: IGame) {
    this.filtered = []
    this.value = null
    this.$store.commit('games/setSelectedGame', game)
    this.$emit('searched')
    this.$router.push({ name: 'game-id', params: { id: game.id } })
    if (Object.keys(this.$route.params).length > 0) window.scrollTo(0, 0)
  }
}
</script>
