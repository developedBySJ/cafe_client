import axios, { AxiosResponse } from 'axios'
import { OrderDetailResponse } from './orderDetail.type'

export const ORDER_URL = (id: string) => `/api/v1/orders/${id}`

export const GET_ORDER_DETAIL = async (id: string): Promise<AxiosResponse<OrderDetailResponse>> =>
  await axios.get(ORDER_URL(id), {})
