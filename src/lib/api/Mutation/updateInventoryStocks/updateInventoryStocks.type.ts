import { IInventory } from '../../types/inventory.type'

export type InventoryResponse = IInventory

export interface UpdateInventoryStocksPayload {
  id: string
  qty: number
  isAdded: boolean
}
