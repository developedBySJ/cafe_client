import axios, { AxiosResponse } from 'axios'
import { OrderResponse, CreateOrderPayload } from './createOrder.type'

export const BASE_ORDER_URL = `/api/v1/orders`

export const CREATE_ORDER = async (
  payload: CreateOrderPayload,
): Promise<AxiosResponse<OrderResponse>> => await axios.post(BASE_ORDER_URL, payload)
