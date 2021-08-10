import { IOrder } from '../../types/order.type'
import { PaginationResponse } from '../../types/paginationResponse.type'

export interface PendingOrdersResponse extends PaginationResponse<IOrder> {}
