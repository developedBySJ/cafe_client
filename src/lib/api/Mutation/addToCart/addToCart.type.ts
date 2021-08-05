import { ICart } from '../../types/userItems.type'

export type CartResponse = ICart

export interface AddToCartPayload {
  menuItem: string
  qty: number
}
