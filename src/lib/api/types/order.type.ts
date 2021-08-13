import { PageOptions } from './pageOptions.type'
import { IUser } from './user.type'
import { ICart } from './userItems.type'

export interface IOrder {
  id: string
  user: IUser
  address: string
  payment: string
  table: string
  total: number
  status: string
  notes: string
  orderItems: ICart[]
  deliveredAt: Date
  createdAt: Date
}

export enum PaymentStatus {
  Paid = 'paid',
  UnPaid = 'unpaid',
}

export enum OrderSortBy {
  CreatedAt = 'createdAt',
  DeliveredAt = 'deliveredAt',
  Status = 'status',
}

export enum OrderStatus {
  Placed,
  Confirmed,
  Processed,
  Completed,
  Delivered,
  Cancelled,
}

export interface OrdersQuery extends PageOptions {
  status?: OrderStatus | 'pending'
  deliveredAt?: Date
  createdAtBefore?: Date
  createdAtAfter?: Date
  totalGte?: number
  totalLte?: number
  paymentStatus?: PaymentStatus
  sortBy?: OrderSortBy
}
