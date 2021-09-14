import axios, { AxiosResponse } from 'axios'
import { UpdateUserPayload, UserResponse } from './updateUser.type'

export const USERS_URL = (id: string) => `/api/v1/users/${id}`

export const UPDATE_USERS = async ({
  id,
  ...payload
}: UpdateUserPayload): Promise<AxiosResponse<UserResponse>> =>
  await axios.patch(USERS_URL(id), payload)
