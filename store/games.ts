import { IGame, IGamesCategories, IState } from '@/types/games.types'

export const state = (): IState => ({
  categories: {},
  currentCategories: [],
  currentCategoryName: null,
  featured: null,
  selectedGame: null,
  searchedGames: [],
})

export const mutations = {
  setCategories(state: IState, payload: IGamesCategories): void {
    state.categories = payload
  },
  setCurrentCategories(state: IState, payload: IGame[]): void {
    state.currentCategories = payload
  },
  setCurrentCategoryName(state: IState, payload: string): void {
    state.currentCategoryName = payload
  },
  setSelectedGame(state: IState, payload: IGame): void {
    state.selectedGame = payload
  },
  setFeaturedGame(state: IState, payload: IGame): void {
    state.featured = payload
  },
  setSearchedGames(state: IState, payload: IGame[]): void {
    state.searchedGames = payload
  },
}

export const getters = {
  getGamesForCategory(state: IState): any {
    return (category: string) => state.categories[+category]
  },
}
