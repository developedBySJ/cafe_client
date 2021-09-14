import axios, { AxiosResponse } from 'axios'
import { UsersDetailsResponse } from './usersDetails.type'

export const USERS_URL = (id: string) => `/api/v1/users/${id}`

export const GET_USER_DETAILS = async (id: string): Promise<AxiosResponse<UsersDetailsResponse>> =>
  await axios.get(USERS_URL(id))
