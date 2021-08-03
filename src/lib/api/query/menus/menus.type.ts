import { IMenu } from '../../types/menu.type'
import { PageOptions } from '../../types/pageOptions.type'
import { PaginationResponse } from '../../types/paginationResponse.type'

export type MenusResponse = PaginationResponse<IMenu>

export interface MenuQuery extends PageOptions {
  search?: string
  isActive?: boolean
}
