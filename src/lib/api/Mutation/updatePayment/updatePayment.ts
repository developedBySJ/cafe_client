import axios, { AxiosResponse } from 'axios'
import { UpdateInventoryPayload, InventoryResponse } from './updatePayment.type'

export const UPDATE_PAYMENT_URL = (id: string) => `/api/v1/payments/${id}`

export const UPDATE_PAYMENTS = async ({
  id,
  ...payload
}: UpdateInventoryPayload): Promise<AxiosResponse<InventoryResponse>> =>
  await axios.patch(UPDATE_PAYMENT_URL(id), payload)
