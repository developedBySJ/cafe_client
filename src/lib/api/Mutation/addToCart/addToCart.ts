import axios, { AxiosResponse } from 'axios'
import { CartResponse, AddToCartCartPayload } from './addToCart.type'

export const BASE_BASE_URL = `/api/v1/cart`

export const ADD_CART_ITEM = async (
  payload: AddToCartCartPayload,
): Promise<AxiosResponse<CartResponse>> => await axios.post(BASE_BASE_URL, payload)
