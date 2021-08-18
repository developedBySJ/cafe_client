import axios, { AxiosResponse } from 'axios'
import { MenuItemsQuery, MenuItemsResponse } from './menuItems.type'

export const MENU_ITEMS_URL = '/api/v1/menu-items'

export const MENU_ITEMS = async (
  params: string | undefined | {},
): Promise<AxiosResponse<MenuItemsResponse>> =>
  await axios.get(MENU_ITEMS_URL, {
    params,
  })
