import axios, { AxiosResponse } from 'axios'
import { AllOrdersResponse } from './allOrders.type'

export const ALL_ORDERS_BASE_URL = '/api/v1/orders/all'

export const GET_ALL_ORDER = async (
  params: string | undefined,
): Promise<AxiosResponse<AllOrdersResponse>> =>
  await axios.get(`${ALL_ORDERS_BASE_URL}${params || ''}`)
