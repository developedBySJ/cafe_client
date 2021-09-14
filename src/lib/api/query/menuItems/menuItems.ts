import axios, { AxiosResponse } from 'axios'
import { MenuItemsResponse } from './menuItems.type'

export const MENU_ITEMS_URL = '/api/v1/menu-items'

export const GET_MENU_ITEMS = async (
  params: string | undefined,
): Promise<AxiosResponse<MenuItemsResponse>> => await axios.get(`${MENU_ITEMS_URL}${params || ''}`)
