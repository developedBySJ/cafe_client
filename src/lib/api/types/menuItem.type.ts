import { IMenu } from './menu.type'
import { IReview } from './review.type'
import { IUser } from './user.type'

export interface MenuItemReview {
  reviews: IReview[]
  reviewCount: number
  ratings: number
}
export interface IMenuItem extends MenuItemReview {
  id: string
  title: string
  subTitle: string
  images: string[]
  isAvailable: boolean
  isVeg: boolean
  price: number
  discount: number
  description?: string
  prepTime?: number
  menu: IMenu
  ingredients: string[]
  createdBy?: IUser
  createdAt: Date
  updatedAt: Date
}
