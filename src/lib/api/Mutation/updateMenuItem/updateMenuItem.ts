import axios, { AxiosResponse } from 'axios'
import { UpdateMenuItemPayload, MenuItemResponse } from './updateMenuItem.type'

export const MENU_ITEM_URL = (id: string) => `/api/v1/menu-items/${id}`

export const UPDATE_MENU_ITEM = async ({
  id,
  ...payload
}: UpdateMenuItemPayload): Promise<AxiosResponse<MenuItemResponse>> =>
  await axios.patch(MENU_ITEM_URL(id), payload)
