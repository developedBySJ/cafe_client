import { IUser } from '../api/types'

export interface Viewer extends Partial<IUser> {
  didRequest?: boolean
}
