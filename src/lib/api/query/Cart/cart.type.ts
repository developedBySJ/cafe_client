import { PageOptions } from '../../types/pageOptions.type'
import { PaginationResponse } from '../../types/paginationResponse.type'
import { IUserItems } from '../../types/userItems.type'

export interface Cart extends IUserItems {
  qty: number
}

export interface CartResponse extends PaginationResponse<Cart> {
  meta: {
    discount: number
    total: number
    taxes: number
  }
}

export interface CartQuery extends PageOptions {}
