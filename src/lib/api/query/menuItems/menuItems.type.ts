import { Sort } from '../../../types'
import { IMenuItems } from '../../types/menuItems.type'
import { PageOptions } from '../../types/pageOptions.type'
import { PaginationResponse } from '../../types/paginationResponse.type'

export enum MenuItemSortBy {
  Price = 'price',
  Discount = 'discount',
  PrepTime = 'prepTime',
  IsAvailable = 'isAvailable',
  CreatedAt = 'createdAt',
}

export type MenuItemsResponse = PaginationResponse<IMenuItems>

export interface MenuItemsQuery extends PageOptions {
  search?: string
  isAvailable?: boolean
  isVeg?: boolean
  priceGte?: number
  priceLte?: number
  discount?: number
  prepTime?: number
  menu?: string
  sortBy?: MenuItemSortBy
  sort?: Sort
  ingredients?: string
}
