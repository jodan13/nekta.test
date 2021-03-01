export interface User {
  email: string
  password: string
  personal_data_access?: boolean
}
export interface nAuthResponse {
  data: {
    access_token: string,
    token_type: string,
    expires_at: string
  }
}

export interface Device {
  id: string,
  name: string,
  last_active: string
}
