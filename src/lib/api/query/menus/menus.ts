import axios, { AxiosResponse } from 'axios'
import { MenuQuery, MenusResponse } from './menus.type'

export const MENUS_URL = '/api/v1/menus'

export const GET_MENUS = async (
  params: MenuQuery | undefined,
): Promise<AxiosResponse<MenusResponse>> =>
  await axios.get(MENUS_URL, {
    params,
  })
