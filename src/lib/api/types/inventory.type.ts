import { IUser } from "."

export interface IInventory {
  id: string
  name: string
  availableStock: number
  image?: string
  tags?: string[]
  units?: string[]
  unit?: string
  createdBy: IUser
  createdAt: Date
  updatedAt: Date
}