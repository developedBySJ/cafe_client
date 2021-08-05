import { ICart } from '../../types/userItems.type'

export type CartResponse = ICart

export interface UpdateCartPayload {
  id: string
  qty: number
}

export type RemoveCartResponse = null
