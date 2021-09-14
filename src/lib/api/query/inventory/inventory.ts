import axios, { AxiosResponse } from 'axios'
import { InventoryResponse } from './inventory.type'

export const INVENTORY_URL = '/api/v1/inventory'

export const GET_INVENTORY = async (
  params: string | undefined,
): Promise<AxiosResponse<InventoryResponse>> => await axios.get(`${INVENTORY_URL}${params || ''}`)
