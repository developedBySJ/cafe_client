import axios, { AxiosResponse } from 'axios'
import { SignUpPayload, SignUpResponse } from './signup.type'

export const SIGN_UP_URL = '/api/v1/signup'

export const SIGN_UP = (payload: SignUpPayload): Promise<AxiosResponse<SignUpResponse>> =>
  axios.post(SIGN_UP_URL, payload)
