import axios, { AxiosResponse } from 'axios'
import { UpdateInventoryPayload, InventoryResponse } from './updateInventory.type'

export const INVENTORY_URL = (id: string) => `/api/v1/inventory/${id}`

export const UPDATE_INVENTORY = async ({
  id,
  ...payload
}: UpdateInventoryPayload): Promise<AxiosResponse<InventoryResponse>> =>
  await axios.patch(INVENTORY_URL(id), payload)
