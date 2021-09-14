import axios from 'axios'

export const MENU_ITEM_URL = (id: string) => `/api/v1/menu-items/${id}`

export const DELETE_MENU_ITEM = (id: string) => axios.delete<null>(MENU_ITEM_URL(id))
