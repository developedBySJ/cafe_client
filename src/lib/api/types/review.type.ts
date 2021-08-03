import { IUser } from './user.type'

export interface IReview {
  id: string
  menuItem: string
  title: string
  comment: string
  image?: string
  ratings: number
  createdBy: IUser
  createdAt: Date
}
