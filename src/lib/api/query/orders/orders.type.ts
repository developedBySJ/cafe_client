import { IOrder } from '../../types/order.type'
import { PaginationResponse } from '../../types/paginationResponse.type'

export interface OrdersResponse extends PaginationResponse<IOrder> {}
