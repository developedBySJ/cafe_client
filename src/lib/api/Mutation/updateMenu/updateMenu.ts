import axios, { AxiosResponse } from 'axios'
import { UpdateMenuPayload, MenuResponse } from './updateMenu.type'

export const MENU_URL = (id: string) => `/api/v1/menus/${id}`

export const UPDATE_MENU = async ({
  id,
  ...payload
}: UpdateMenuPayload): Promise<AxiosResponse<MenuResponse>> =>
  await axios.patch(MENU_URL(id), payload)
