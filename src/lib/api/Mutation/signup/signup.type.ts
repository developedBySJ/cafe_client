import { IUser } from '../../types'

export interface SignUpPayload {
  firstName: string
  lastName?: string
  email: string
  password: string
}

export type SignUpResponse = IUser
