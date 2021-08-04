import { ICart, IUserItems } from '../../types/userItems.type'

export type CartResponse = ICart

export interface UpdateCartPayload {
  qty: number
}

export type RemoveCartResponse = null
