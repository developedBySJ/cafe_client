import axios, { AxiosResponse } from 'axios'
import { AssetsResponse, CreateAssetPayload, CreateAssetsPayload } from '.'

export const BASE_ASSET_URL = `/api/v1/asset`
export const BASE_ASSETS_URL = `/api/v1/assets`

export const CREATE_ASSET = async (payload: any): Promise<AxiosResponse<AssetsResponse>> =>
  await axios.post(BASE_ASSET_URL, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

export const CREATE_ASSETS = async (payload: any): Promise<AxiosResponse<AssetsResponse[]>> =>
  await axios.post(BASE_ASSETS_URL, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
