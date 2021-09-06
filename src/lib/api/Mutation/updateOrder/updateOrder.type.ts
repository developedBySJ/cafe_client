import { IOrder, OrderStatus } from '../../types/order.type'

export type OrderResponse = IOrder

export interface UpdateOrderPayload {
  id: string
  isDelivered?: boolean
  status: OrderStatus
}
