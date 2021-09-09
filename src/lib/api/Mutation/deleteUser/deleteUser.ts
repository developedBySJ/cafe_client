import axios from "axios"

export const USER_URL = (id: string) => `/api/users/${id}`

export const DELETE_USERS = (id: string) => axios.delete<null>(USER_URL(id))