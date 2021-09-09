import { IMenuItem } from '../../types/menuItem.type'

export type MenuItemResponse = IMenuItem

export interface UpdateMenuItemPayload {
  id: string
  title?: string,
  subTitle?: string,
  images?: string[]
  isAvailable?: boolean,
  isVeg?: boolean,
  price?: number,
  discount?: number,
  description?: string,
  prepTime?: number,
  ingredients?: string[]
  menu?: string
}

