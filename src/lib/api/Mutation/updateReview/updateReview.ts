import axios, { AxiosResponse } from 'axios'
import { UpdateReviewPayload, UpdateReviewResponse } from './updateReview.type'

export const REVIEW_URL = (id: string) => `/api/v1/reviews/${id}`

export const UPDATE_REVIEW = async ({
  reviewId,
  ...payload
}: UpdateReviewPayload): Promise<AxiosResponse<UpdateReviewResponse>> =>
  await axios.patch(REVIEW_URL(reviewId), payload)
