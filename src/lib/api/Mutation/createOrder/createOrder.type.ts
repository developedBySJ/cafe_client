import { IOrder, OrderStatus } from '../../types/order.type'
import { ICart } from '../../types/userItems.type'

export type OrderResponse = IOrder

export interface CreateOrderPayload {
  table?: string
  total: number
  address?: string
  status: OrderStatus
  notes?: string
  isDelivered?: boolean
}
