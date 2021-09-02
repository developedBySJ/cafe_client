import axios, { AxiosResponse } from 'axios'
import { InventoryResponse, CreateInventoryPayload } from './createInventory.type'

export const CREATE_INVENTORY_URL = `/api/v1/inventory`

export const CREATE_INVENTORY = async (
  payload: CreateInventoryPayload,
): Promise<AxiosResponse<InventoryResponse>> => await axios.post(CREATE_INVENTORY_URL, payload)
