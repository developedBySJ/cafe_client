import { UserRole } from '../../../types'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  id: string
  firstName: string
  lastName: string
  email: string
  dateOfBirth: Date | null
  role: UserRole
  address: string
  avatar: string
  createdAt: Date
  updatedAt: Date
}
