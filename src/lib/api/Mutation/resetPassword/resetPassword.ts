import axios, { AxiosResponse } from 'axios'
import { ResetPasswordPayload, ResetPasswordResponse } from './resetPassword.type'

export const RESET_PASSWORD_URL = (token: string) => `/api/v1/reset-password/${token}`

export const RESET_PASSWORD = ({
  password,
  token,
}: ResetPasswordPayload): Promise<AxiosResponse<ResetPasswordResponse>> =>
  axios.patch(RESET_PASSWORD_URL(token), { password })
