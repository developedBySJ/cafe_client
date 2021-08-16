import axios, { AxiosResponse } from 'axios'
import { LOGOUT_RESPONSE } from './logout.type'

export const LOG_OUT_URL = '/api/v1/logout'

export const LOG_OUT = (): Promise<AxiosResponse<LOGOUT_RESPONSE>> => axios.patch(LOG_OUT_URL)
