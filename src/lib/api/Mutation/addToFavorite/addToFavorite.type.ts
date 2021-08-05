import { IFavorite } from '../../types/userItems.type'

export type FavoriteResponse = IFavorite

export interface AddToFavoritePayload {
  menuItem: string
}
