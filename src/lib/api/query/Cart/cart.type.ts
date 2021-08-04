import { PageOptions } from '../../types/pageOptions.type'
import { PaginationResponse } from '../../types/paginationResponse.type'
import { ICart } from '../../types/userItems.type'

export interface CartResponse extends PaginationResponse<ICart> {
  meta: {
    discount: number
    total: number
    taxes: number
  }
}

export interface CartQuery extends PageOptions {}
