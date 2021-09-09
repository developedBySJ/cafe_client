import { IMenuItem } from './menuItem.type';
import { IUser } from './user.type'

export interface IReview {
  id: string
  menuItem: IMenuItem
  title: string
  comment: string
  image?: string
  ratings: number
  createdBy: IUser
  createdAt: Date
}
