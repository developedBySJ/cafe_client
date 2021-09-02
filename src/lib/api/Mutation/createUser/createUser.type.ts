import { UserRole } from '../../../types'
import { IUser } from '../../types'


export type OrderResponse = IUser

export interface CreateUserPayload {
  firstName: string,
  lastName?: string,
  email: string,
  password: string,
  dateOfBirth?: Date,
  role: UserRole,
  address?: string,
  avatar?: string
}
