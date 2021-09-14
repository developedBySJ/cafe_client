import axios, { AxiosResponse } from 'axios'
import { InventoryResponse } from './inventoryDetails.type'

export const INVENTORY_URL = '/api/v1/inventory/'

export const GET_INVENTORY_DETAILS = async (
  id: string,
): Promise<AxiosResponse<InventoryResponse>> => await axios.get(`${INVENTORY_URL}${id}`)
