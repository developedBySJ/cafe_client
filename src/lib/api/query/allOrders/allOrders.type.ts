import { IOrder, OrdersQuery } from '../../types/order.type'
import { PaginationResponse } from '../../types/paginationResponse.type'

export interface AllOrdersResponse extends PaginationResponse<IOrder> {}

export interface AllOrdersQuery extends OrdersQuery {
  userId?: string
}
