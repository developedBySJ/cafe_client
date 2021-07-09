import axios, { AxiosResponse } from 'axios'
import { WhoAmIResponse } from './whoAmI.type'

export const WHO_AM_I_URL = '/api/v1/whoAmI'

export const WHO_AM_I = (): Promise<AxiosResponse<WhoAmIResponse>> => axios.get(WHO_AM_I_URL)
