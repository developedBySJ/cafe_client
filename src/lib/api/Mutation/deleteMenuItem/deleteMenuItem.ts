import axios from "axios"

export const MENU_ITEM_URL = (id: string) => `/api/menu-items/${id}`

export const DELETE_ITEM_MENU = (id: string) => axios.delete<null>(MENU_ITEM_URL(id))