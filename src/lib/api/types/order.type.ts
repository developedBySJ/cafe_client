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
