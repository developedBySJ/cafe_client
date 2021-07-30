import { IMenuItems } from './menuItems.type'

export interface IUserItems {
  id: string
  menuItem: IMenuItems
  qty?: number
  createdAt: Date
}
