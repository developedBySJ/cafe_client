import axios, { AxiosResponse } from 'axios'
import { ClearCartResponse } from './clearCart.type'

export const BASE_BASE_URL = `/api/v1/cart`

export const CART_URL = (id: string) => `${BASE_BASE_URL}/${id}`

export const CLEAR_CART = async (): Promise<AxiosResponse<ClearCartResponse>> =>
  await axios.delete(BASE_BASE_URL)
