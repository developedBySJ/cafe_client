import axios, { AxiosResponse } from 'axios'
import { FavoriteResponse, AddToFavoritePayload } from './addToFavorite.type'

export const BASE_FAV_URL = `/api/v1/favorite`

export const ADD_FAV_ITEM = async (
  payload: AddToFavoritePayload,
): Promise<AxiosResponse<FavoriteResponse>> => await axios.post(BASE_FAV_URL, payload)
