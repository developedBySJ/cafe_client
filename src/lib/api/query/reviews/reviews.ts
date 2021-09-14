import axios, { AxiosResponse } from 'axios'
import { ReviewResponse } from './reviews.type'

export const REVIEWS_URL = '/api/v1/reviews'

export const GET_REVIEWS = async (params: string): Promise<AxiosResponse<ReviewResponse>> =>
  await axios.get(`${REVIEWS_URL}${params || ''}`)
