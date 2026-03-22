import { useMutation, type UseMutationOptions } from '#/hooks/use-mutation'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export interface AuthCamIDRequest {
  partnerToken: string
}

export interface AuthCamIDUser {
  id: number
  name: string
  camId: string
  phone: string
  avatarUrl: string | null
}

export interface AuthCamIDResponse {
  accessToken: string
  refreshToken: string
  expiresIn: number
  tokenType: string
  user: AuthCamIDUser
}

export const authCamID = async (request: AuthCamIDRequest) => {
  const response = await http.post<AuthCamIDResponse>('/auth/sso', request)
  return response
}

export const useAuthCamIDMutation = (
  options: UseMutationOptions<
    HttpCommonResponse<AuthCamIDResponse>,
    AuthCamIDRequest
  >,
) => {
  return useMutation({
    mutationFn: authCamID,
    ...options,
  })
}
