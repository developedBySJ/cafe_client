import axios, { AxiosResponse } from 'axios'
import { ForgotPasswordPayload, ForgotPasswordResponse } from './forgotpassword.type'

export const FORGOT_PASSWORD_URL = '/api/v1/forgot-password'

export const FORGOT_PASSWORD = (
  payload: ForgotPasswordPayload,
): Promise<AxiosResponse<ForgotPasswordResponse>> => axios.post(FORGOT_PASSWORD_URL, payload)
