import axios, { AxiosResponse } from 'axios'
import { UsersResponse } from './users.type'

export const USERS_URL = '/api/v1/users'

export const GET_USERS = async (
  params: string | undefined,
): Promise<AxiosResponse<UsersResponse>> => await axios.get(`${USERS_URL}${params || ''}`)
