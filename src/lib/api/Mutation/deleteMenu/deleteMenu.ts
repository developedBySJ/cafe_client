import axios from 'axios'

export const MENU_URL = (id: string) => `/api/v1/menus/${id}`

export const DELETE_MENU = (id: string) => axios.delete<null>(MENU_URL(id))
