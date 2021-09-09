import axios from "axios"

export const REVIEW_URL = (id: string) => `/api/reviews/${id}`

export const DELETE_REVIEW = (id: string) => axios.delete<null>(REVIEW_URL(id))