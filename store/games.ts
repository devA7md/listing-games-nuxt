import {
  IGame,
  IGamesCategories,
  IModifiedGame,
  IState,
} from '@/types/games.types'

export const state = (): IState => ({
  categories: {},
  recommended: [],
  popular: [],
  featured: null,
  selectedGame: null,
})

export const mutations = {
  setCategories(state: IState, payload: IGamesCategories): void {
    state.categories = payload
  },
  setSelectedGame(state: IState, payload: IGame): void {
    state.selectedGame = payload
  },
  setRecommended(state: IState, payload: IModifiedGame[]): void {
    state.recommended = payload
  },
  setPopular(state: IState, payload: IModifiedGame[]): void {
    state.popular = payload
  },
  setFeaturedGame(state: IState, payload: IGame): void {
    state.featured = payload
  },
}
