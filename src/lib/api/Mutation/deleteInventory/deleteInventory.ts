import axios from "axios"

export const INVENTORY_URL = (id: string) => `/api/v1/inventory/${id}`

export const DELETE_INVENTORY = (id: string) => axios.delete<null>(INVENTORY_URL(id))