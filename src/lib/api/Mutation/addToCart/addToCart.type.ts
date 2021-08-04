import { ICart } from '../../types/userItems.type'

export type CartResponse = ICart

export interface AddToCartCartPayload {
  menuItem: string
  qty: number
}
