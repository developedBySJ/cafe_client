import axios, { AxiosResponse } from 'axios'
import { MenuItemResponse } from './menuItem.type'

export const MENU_ITEM_URL = (id: string) => `/api/v1/menu-items/${id}`

export const GET_MENU_ITEM = async (id: string): Promise<AxiosResponse<MenuItemResponse>> =>
  await axios.get(MENU_ITEM_URL(id), {})
