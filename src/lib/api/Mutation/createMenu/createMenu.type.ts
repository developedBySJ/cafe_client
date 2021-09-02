import { IMenu } from '../../types/menu.type'

export type MenuResponse = IMenu

export interface CreateMenuPayload {
  name: string
  isActive: boolean
  image?: string
}
