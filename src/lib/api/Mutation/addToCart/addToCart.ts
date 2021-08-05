import axios, { AxiosResponse } from 'axios'
import { CartResponse, AddToCartPayload } from './addToCart.type'

export const BASE_CART_URL = `/api/v1/cart`

export const ADD_CART_ITEM = async (
  payload: AddToCartPayload,
): Promise<AxiosResponse<CartResponse>> => await axios.post(BASE_CART_URL, payload)
