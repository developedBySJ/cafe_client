import axios, { AxiosResponse } from 'axios'
import { ReviewQuery, ReviewResponse } from './reviews.type'

export const REVIEWS_URL = '/api/v1/reviews'

export const GET_REVIEWS = async (params: ReviewQuery): Promise<AxiosResponse<ReviewResponse>> =>
  await axios.get(REVIEWS_URL, {
    params,
  })
