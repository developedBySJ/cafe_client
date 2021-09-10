import axios from "axios"

export const ORDER_URL = (id: string) => `/api/v1/orders/${id}`

export const DELETE_ORDER_MENU = (id: string) => axios.delete<null>(ORDER_URL(id))