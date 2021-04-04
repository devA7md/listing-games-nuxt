import axios from 'axios'

import { IGame } from '~/types/games.types'
import { URL } from '~/constants/general'

export const fetchAndCategorizeGames = async (): Promise<
  Record<string, IGame[]>
> => {
  const res = await axios.get(URL + '/posts')
  return res.data.reduce((acc: Record<string, IGame[]>, post: IGame) => {
    return { ...acc, [post.userId]: [...(acc[post.userId] || []), post] }
  }, {})
}

export const handleAxiosError = (error: any, customMessage: string): string => {
  let message = null
  if (error.isAxiosError && error.response) {
    const {
      response: { data },
    } = error
    message = Object.keys(data).length > 0 ? data : customMessage
  } else {
    message = error.message
  }
  return message
}
