import axios, { AxiosResponse } from 'axios'
import { RefreshResponse } from './refresh.type'

export const REFRESH_URL = '/api/v1/refresh'

export const REFRESH_TOKEN = (): Promise<AxiosResponse<RefreshResponse>> => axios.get(REFRESH_URL)
