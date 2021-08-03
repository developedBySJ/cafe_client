import axios, { AxiosResponse } from 'axios'
import { FavoritesResponse, FavoritesQuery } from './favorites.type'

export const FAVORITES_URL = '/api/v1/favorite'

export const GET_FAVORITES = async (
  params: FavoritesQuery | undefined,
): Promise<AxiosResponse<FavoritesResponse>> =>
  await axios.get(FAVORITES_URL, {
    params,
  })
