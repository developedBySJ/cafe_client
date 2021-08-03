import axios, { AxiosResponse } from 'axios'
import { MenuResponse } from './menu.type'

export const MENU_URL = (id: string) => `/api/v1/menus/${id}`

export const GET_MENU = async (id: string): Promise<AxiosResponse<MenuResponse>> =>
  await axios.get(MENU_URL(id))
