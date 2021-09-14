import { AssetType } from '../../../types'
import { IAssets } from '../../types/assets'

export type AssetsResponse = IAssets

export interface CreateAssetPayload {
  type: AssetType
  file: any
}
export interface CreateAssetsPayload {
  type: AssetType
  files: any
}
