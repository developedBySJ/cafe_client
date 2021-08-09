import { PageOptions } from '../../types/pageOptions.type'
import { PaginationResponse } from '../../types/paginationResponse.type'
import { IReview } from '../../types/review.type'

export interface ReviewResponse extends PaginationResponse<IReview> {}

export enum ReviewSortBy {
  Ratings = 'ratings',
  CreatedAt = 'createdAt',
}

export interface ReviewQuery extends PageOptions {
  menuItemId: string
  ratings?: number
  sortBy?: ReviewSortBy
  user?: string
}
