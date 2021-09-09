import axios from "axios"

export const PAYMENT_URL = (id: string) => `/api/payments/${id}`

export const DELETE_PAYMENT = (id: string) => axios.delete<null>(PAYMENT_URL(id))