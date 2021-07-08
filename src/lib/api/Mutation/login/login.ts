import axios, { AxiosResponse } from 'axios'
import { LoginPayload, LoginResponse } from './login.type'

export const LOGIN_URL = '/api/v1/login'

export const LOGIN = (payload: LoginPayload): Promise<AxiosResponse<LoginResponse>> =>
  axios.post(LOGIN_URL, payload)
