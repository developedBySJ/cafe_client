import axios, { AxiosResponse } from 'axios'
import { CreateReviewPayload, CreateReviewResponse } from './createReview.type'

export const REVIEW_URL = `/api/v1/reviews`

export const CREATE_REVIEW = async (
  payload: CreateReviewPayload,
): Promise<AxiosResponse<CreateReviewResponse>> => await axios.post(REVIEW_URL, payload)
