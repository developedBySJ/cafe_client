import { UserRole } from '../../../types'
import { IUser } from '../../types'

export interface LoginPayload {
  email: string
  password: string
}

export type LoginResponse = IUser
