import { ICart } from '../../types/userItems.type'

export type ChargeResponse = any

export interface CreateChargePayload {
  paymentMethodId: string
  amount: number
  orderId: string
}
