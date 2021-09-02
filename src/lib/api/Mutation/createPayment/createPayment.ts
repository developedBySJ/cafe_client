import axios, { AxiosResponse } from 'axios'
import { CreateCashPaymentPayload } from '.'
import { PaymentResponse, CreateCardPaymentPayload } from './createPayment.type'

export const CARD_PAYMENT_URL = `/api/v1/payments`

export const CREATE_CARD_PAYMENT = async (
  payload: CreateCardPaymentPayload,
): Promise<AxiosResponse<PaymentResponse>> => await axios.post(CARD_PAYMENT_URL, payload)

export const CREATE_CASH_PAYMENT = async (
  payload: CreateCashPaymentPayload,
): Promise<AxiosResponse<PaymentResponse>> => await axios.post(`${CARD_PAYMENT_URL}/cash`, payload)
