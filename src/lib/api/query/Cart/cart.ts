import axios, { AxiosResponse } from 'axios'
import { CartQuery, CartResponse } from './cart.type'

export const CART_URL = '/api/v1/cart'

export const GET_CART = async (
  params: CartQuery | undefined,
): Promise<AxiosResponse<CartResponse>> =>
  await axios.get(CART_URL, {
    params,
  })
