import { PageOptions } from '../../types/pageOptions.type'
import { PaginationResponse } from '../../types/paginationResponse.type'
import { IUserItems } from '../../types/userItems.type'

export interface Favorites extends IUserItems {
  qty: undefined
}

export interface FavoritesResponse extends PaginationResponse<Favorites> {}

export interface FavoritesQuery extends PageOptions {}
