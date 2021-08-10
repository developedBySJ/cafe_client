import { IReview } from '../../types/review.type'

export type UpdateReviewResponse = IReview

export interface UpdateReviewPayload {
  reviewId: string
  title?: string
  comment?: string
  image?: string
  ratings?: number
}
