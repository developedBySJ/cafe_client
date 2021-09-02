import axios, { AxiosResponse } from 'axios'
import { MenuItemResponse, CreateMenuItemPayload } from './createMenuItem.type'

export const MENU_ITEM_URL = `/api/v1/menu-items`

export const CREATE_MENU_ITEMS = async (
  payload: CreateMenuItemPayload,
): Promise<AxiosResponse<MenuItemResponse>> => await axios.post(MENU_ITEM_URL, payload)
