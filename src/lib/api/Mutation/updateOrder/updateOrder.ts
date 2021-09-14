import axios, { AxiosResponse } from 'axios'
import { OrderResponse, UpdateOrderPayload } from './updateOrder.type'

export const UPDATE_ORDER_URL = (id: string) => `/api/v1/orders/${id}`

export const UPDATE_ORDER = async ({
  id,
  ...payload
}: UpdateOrderPayload): Promise<AxiosResponse<OrderResponse>> =>
  await axios.patch(UPDATE_ORDER_URL(id), payload)
