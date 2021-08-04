import { IMenuItems } from './menuItems.type'

export interface IUserItems {
  id: string
  menuItem: IMenuItems
  qty?: number
  createdAt: Date
}

export interface ICart extends IUserItems {
  qty: number
}

export interface IFavorite extends IUserItems {
  qty: undefined
}
