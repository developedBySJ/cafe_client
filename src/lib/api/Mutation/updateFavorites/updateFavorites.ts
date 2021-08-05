import axios, { AxiosResponse } from 'axios'
import { RemoveFavResponse } from './updateFavorites.type'

export const BASE_FAV_URL = `/api/v1/favorite`

export const FAV_URL = (id: string) => `${BASE_FAV_URL}/${id}`

export const REMOVE_FAV_ITEM = async (id: string): Promise<AxiosResponse<RemoveFavResponse>> =>
  await axios.delete(FAV_URL(id))
