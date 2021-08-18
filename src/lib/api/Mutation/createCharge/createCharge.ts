import axios, { AxiosResponse } from 'axios'
import { ChargeResponse, CreateChargePayload } from './createCharge.type'

export const CREATE_CHARGE_URL = `/api/v1/payments`

export const CREATE_CHARGE = async (
  payload: CreateChargePayload,
): Promise<AxiosResponse<ChargeResponse>> => await axios.post(CREATE_CHARGE_URL, payload)
