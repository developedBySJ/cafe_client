import { IInventory } from '../../types/inventory.type'

export type InventoryResponse = IInventory

export interface UpdateInventoryPayload {
  id: string
  name?: string
  availableStock?: number
  image?: string
  tags?: string[]
  units?: string[]
  unit?: string[]
}
