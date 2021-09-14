import { IUser } from '.'
import { IOrder } from './order.type'

export enum PaymentType {
  Card = 'card',
  Cash = 'cash',
}

export interface IPayment {
  id: string
  amount: number
  referenceId: string
  order: IOrder
  type: PaymentType
  description: string
  createdBy: IUser
  createdAt: Date
  updatedAt: Date
}
