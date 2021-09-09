import { Sort } from '../../../types'
import { PaginationResponse } from '../../types/paginationResponse.type'
import { IPayment } from '../../types/payment.type'


export type PaymentResponse = PaginationResponse<IPayment>
