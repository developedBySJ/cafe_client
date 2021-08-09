import { IReview } from '../../types/review.type'

export type CreateReviewResponse = IReview

export interface CreateReviewPayload {
  menuItem: string
  title: string
  comment: string
  image?: string
  ratings: number
}
