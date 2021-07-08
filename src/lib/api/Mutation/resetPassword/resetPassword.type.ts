export interface ResetPasswordPayload {
  password: string
  token: string
}

export interface ResetPasswordParams {
  token: string
}

export type ResetPasswordResponse = null
