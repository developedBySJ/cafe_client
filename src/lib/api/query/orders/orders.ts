import axios, { AxiosResponse } from 'axios'
import { OrdersQuery } from '../../types/order.type'
import { OrdersResponse } from './orders.type'

export const ORDERS_BASE_URL = '/api/v1/orders'

export const GET_USER_ORDER = async (
  params: OrdersQuery | undefined,
): Promise<AxiosResponse<OrdersResponse>> =>
  await axios.get(ORDERS_BASE_URL, {
    params,
  })
