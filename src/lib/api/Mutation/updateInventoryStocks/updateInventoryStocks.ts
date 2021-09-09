import axios, { AxiosResponse } from 'axios'
import { UpdateInventoryStocksPayload, InventoryResponse } from './updateInventoryStocks.type'

export const INVENTORY_URL = (id: string) => `/api/v1/inventory/${id}/stocks`

export const UPDATE_INVENTORY_STOCKS = async ({
  id,
  ...payload
}: UpdateInventoryStocksPayload): Promise<AxiosResponse<InventoryResponse>> =>
  await axios.patch(INVENTORY_URL(id), payload)
