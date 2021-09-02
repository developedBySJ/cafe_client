import { IPayment } from '../../types/payment.type'

export type PaymentResponse = IPayment

export interface CreateCardPaymentPayload {
  paymentMethodId: string
  amount: 0
  orderId: string
}

export interface CreateCashPaymentPayload {
  description: string
  amount: 0
  orderId: string
}
