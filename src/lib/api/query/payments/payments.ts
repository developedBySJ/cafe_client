import axios, { AxiosResponse } from 'axios'
import { PaymentResponse } from './payments.type'

export const PAYMENTS_URL = '/api/v1/payments/'

export const GET_PAYMENTS = async (
  params: string | undefined,
): Promise<AxiosResponse<PaymentResponse>> => await axios.get(`${PAYMENTS_URL}${params || ''}`)
