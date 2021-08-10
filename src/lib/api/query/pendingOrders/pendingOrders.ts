import axios, { AxiosResponse } from 'axios'
import { OrdersQuery } from '../../types/order.type'
import { PendingOrdersResponse } from './pendingOrders.type'

export const PENDING_ORDERS_BASE_URL = '/api/v1/orders/pending'

export const GET_PENDING_ORDER = async (
  params: OrdersQuery | undefined,
): Promise<AxiosResponse<PendingOrdersResponse>> =>
  await axios.get(PENDING_ORDERS_BASE_URL, {
    params,
  })
