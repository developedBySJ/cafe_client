import axios, { AxiosResponse } from 'axios'
import { OrderResponse, CreateUserPayload } from './createUser.type'

export const CREATE_USER_URL = `/api/v1/users`

export const CREATE_USER = async (
  payload: CreateUserPayload,
): Promise<AxiosResponse<OrderResponse>> => await axios.post(CREATE_USER_URL, payload)
