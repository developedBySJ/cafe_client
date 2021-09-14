import { IInventory } from '../../types/inventory.type'

export type InventoryResponse = IInventory

export interface UpdateInventoryPayload {
  id: string
  orderId?: string
}
