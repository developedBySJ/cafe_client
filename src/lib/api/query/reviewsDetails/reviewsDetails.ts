import axios, { AxiosResponse } from 'axios'
import { ReviewDetailsResponse } from './reviewsDetails.type'

export const REVIEWS_URL = (id: string) => `/api/v1/reviews`

export const GET_REVIEWS_DETAILS = async (
  id: string,
): Promise<AxiosResponse<ReviewDetailsResponse>> => await axios.get(REVIEWS_URL(id))
