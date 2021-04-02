import {
  IGame,
  IGamesCategories,
  IRecommendedGame,
  IState,
} from '@/types/games.types'

export const state = () => ({
  categories: {},
  recommended: [],
  featured: {},
  selectedGame: null,
})

export const mutations = {
  setCategories(state: IState, payload: IGamesCategories): void {
    state.categories = payload
  },
  setSelectedGame(state: IState, payload: IGame): void {
    state.selectedGame = payload
  },
  setRecommended(state: IState, payload: IRecommendedGame[]): void {
    state.recommended = payload
  },
  setFeaturedGame(state: IState, payload: IGame): void {
    state.featured = payload
  },
}
