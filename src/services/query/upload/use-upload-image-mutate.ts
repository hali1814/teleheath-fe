import { useMutation, type UseMutationOptions } from '#/hooks/use-mutation'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export interface UploadImageRequest {
  file: File
}

export interface UploadImageResponse {
  fileId: string
  originalFilename: string
  remotePath: string
  fileUrl: string
  sizeBytes: number
  contentType: string
}

export async function uploadImage(
  request: UploadImageRequest,
  signal: AbortSignal,
): Promise<HttpCommonResponse<UploadImageResponse>> {
  return http.postMultipart<UploadImageResponse>('/files/upload', request, {
    signal,
  })
}

export const useUploadImageMutation = (
  options?: UseMutationOptions<
    HttpCommonResponse<UploadImageResponse>,
    UploadImageRequest
  >,
) => {
  return useMutation({
    mutationFn: uploadImage,
    ...options,
  })
}
