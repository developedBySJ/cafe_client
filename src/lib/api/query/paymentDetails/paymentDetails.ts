import axios, { AxiosResponse } from 'axios'
import { PaymentDetailsResponse } from './paymentDetails.type'

export const PAYMENTS_URL = (id: string) => `/api/v1/payments/${id}`

export const GET_PAYMENT_DETAILS = async (
  id: string,
): Promise<AxiosResponse<PaymentDetailsResponse>> => await axios.get(PAYMENTS_URL(id))
