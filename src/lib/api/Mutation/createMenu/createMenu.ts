import axios, { AxiosResponse } from 'axios'
import { MenuResponse, CreateMenuPayload } from './createMenu.type'

export const MENU_URL = `/api/v1/menus`

export const CREATE_MENU = async (
  payload: CreateMenuPayload,
): Promise<AxiosResponse<MenuResponse>> => await axios.post(MENU_URL, payload)
