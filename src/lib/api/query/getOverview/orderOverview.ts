import axios, { AxiosResponse } from 'axios'
import { PaymentOverview } from '.'
import { OrderOverview } from './overview.type'


export const ORDER_OVERVIEW_URL = '/api/v1/orders/overview'
export const PAYMENT_OVERVIEW_URL = '/api/v1/payments/overview'

export const GET_ORDER_OVERVIEW = async (
): Promise<AxiosResponse<OrderOverview>> =>
  await axios.get(ORDER_OVERVIEW_URL)

export const GET_PAYMENT_OVERVIEW = async (
): Promise<AxiosResponse<PaymentOverview>> =>
  await axios.get(PAYMENT_OVERVIEW_URL)
