export interface IGame {
  userId: string
  id: string
  title: string
  body: string
}

export interface IGamesCategories {
  [id: string]: IGame[]
}

export interface IState {
  categories: IGamesCategories
  currentCategories: IGame[]
  currentCategoryName: string | null
  featured: IGame | null
  selectedGame: IGame | null
  searchedGames: IGame[]
}
