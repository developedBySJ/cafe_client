import { IMenu } from '../../types/menu.type'

export type MenuResponse = IMenu

export interface UpdateMenuPayload {
  id: string
  name?: string
  isActive?: boolean
  image?: string
}

