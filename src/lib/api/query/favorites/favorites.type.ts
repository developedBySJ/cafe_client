import { PageOptions } from '../../types/pageOptions.type'
import { PaginationResponse } from '../../types/paginationResponse.type'
import { IFavorite } from '../../types/userItems.type'

export interface FavoritesResponse extends PaginationResponse<IFavorite> {}

export interface FavoritesQuery extends PageOptions {}
