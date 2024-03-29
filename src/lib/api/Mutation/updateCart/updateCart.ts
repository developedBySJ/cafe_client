import axios, { AxiosResponse } from 'axios'
import { UpdateCartPayload, CartResponse, RemoveCartResponse } from './updateCart.type'

export const BASE_CART_URL = `/api/v1/cart`

export const CART_URL = (id: string) => `${BASE_CART_URL}/${id}`

export const UPDATE_CART_ITEM = async ({
  id,
  ...payload
}: UpdateCartPayload): Promise<AxiosResponse<CartResponse>> =>
  await axios.patch(CART_URL(id), payload)

export const REMOVE_CART_ITEM = async (id: string): Promise<AxiosResponse<RemoveCartResponse>> =>
  await axios.delete(CART_URL(id))
