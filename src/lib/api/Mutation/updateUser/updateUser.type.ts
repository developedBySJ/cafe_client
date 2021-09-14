import { UserRole } from '../../../types'
import { IUser } from '../../types'

export type UserResponse = IUser

export interface UpdateUserPayload {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  dateOfBirth?: Date | null
  role?: UserRole
  address?: string
  avatar?: string
}
