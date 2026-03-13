import { cleanParams } from '#/utils'
import { type AxiosRequestConfig } from 'axios'
import { axiosInstance } from './axios.service'

export interface HttpCommonResponse<T> {
  data: T
  success: boolean
  message: string
  error: {
    code: string
    details: {
      message: string
    }
  }
  timestamp: string
  statusCode: number
  meta?: {
    current_page: number
    per_page: number
    total: number
    last_page: number
  }
}

export const http = {
  /**
   * GET request with query parameters
   * @template T - Response data type (can be any type)
   * @param endpoint - API endpoint (e.g., '/users', '/products')
   * @param queryParams - Query parameters object (optional)
   * @param requestConfig - Additional axios config (optional)
   * @returns Promise with API response data
   */
  get: async <T>(
    endpoint: string,
    queryParams?: object,
    requestConfig?: AxiosRequestConfig,
  ): Promise<HttpCommonResponse<T>> => {
    // Build query string from parameters
    const cleanedParams = cleanParams(queryParams || {})
    const queryString = new URLSearchParams(cleanedParams).toString()
    const fullUrl = queryString ? `${endpoint}?${queryString}` : endpoint

    const response = await axiosInstance.get<HttpCommonResponse<T>>(
      fullUrl,
      requestConfig,
    )
    return response.data
  },

  /**
   * POST request to create new resource
   * @template T - Response data type (can be any type)
   * @template P - Request body data type
   * @param endpoint - API endpoint (e.g., '/users', '/orders')
   * @param requestBody - Data to send in request body (optional)
   * @param requestConfig - Additional axios config (optional)
   * @returns Promise with API response data
   */
  post: async <T>(
    endpoint: string,
    requestBody?: object,
    requestConfig?: AxiosRequestConfig,
  ): Promise<HttpCommonResponse<T>> => {
    const cleanedData = cleanParams(requestBody || {})
    const response = await axiosInstance.post<HttpCommonResponse<T>>(
      endpoint,
      cleanedData,
      {
        ...requestConfig,
      },
    )
    return response.data
  },

  /**
   * PUT request to update existing resource
   * @template T - Response data type (can be any type)
   * @template P - Request body data type
   * @param endpoint - API endpoint (e.g., '/users/123', '/products/456')
   * @param requestBody - Data to update (optional)
   * @param requestConfig - Additional axios config (optional)
   * @returns Promise with API response data
   */
  put: async <T>(
    endpoint: string,
    requestBody?: object,
    requestConfig?: AxiosRequestConfig,
  ): Promise<HttpCommonResponse<T>> => {
    const cleanedData = cleanParams(requestBody || {})

    const response = await axiosInstance.put<HttpCommonResponse<T>>(
      endpoint,
      cleanedData,
      {
        ...requestConfig,
      },
    )
    return response.data
  },

  /**
   * DELETE request to remove resource
   * @template T - Response data type (can be any type)
   * @param endpoint - API endpoint (e.g., '/users/123', '/products/456')
   * @param requestConfig - Additional axios config (optional)
   * @returns Promise with API response data
   */
  delete: async <T>(
    endpoint: string,
    requestConfig?: AxiosRequestConfig,
  ): Promise<HttpCommonResponse<T>> => {
    const response = await axiosInstance.delete<HttpCommonResponse<T>>(
      endpoint,
      {
        ...requestConfig,
      },
    )
    return response.data
  },

  /**
   * GET request with custom config (without default baseURL)
   * Use this when you need to call external APIs or override baseURL
   * @template T - Response data type (can be any type)
   * @template P - Query parameters type
   * @param endpoint - API endpoint
   * @param queryParams - Query parameters object (optional)
   * @param requestConfig - Custom axios config
   * @returns Promise with API response data
   */
  getConfig: async <T>(
    endpoint: string,
    queryParams?: object,
    requestConfig?: AxiosRequestConfig,
  ): Promise<HttpCommonResponse<T>> => {
    const cleanedParams = cleanParams(queryParams || {})
    const queryString = new URLSearchParams(cleanedParams).toString()
    const fullUrl = queryString ? `${endpoint}?${queryString}` : endpoint

    const response = await axiosInstance.get<HttpCommonResponse<T>>(
      fullUrl,
      requestConfig,
    )
    return response.data
  },

  /**
   * POST request with custom config (without default baseURL)
   * Use this when you need to call external APIs or override baseURL
   * @template T - Response data type (can be any type)
   * @template P - Request body data type
   * @param endpoint - API endpoint
   * @param requestBody - Data to send in request body (optional)
   * @param requestConfig - Custom axios config
   * @returns Promise with API response data
   */
  postConfig: async <T>(
    endpoint: string,
    requestBody?: object,
    requestConfig?: AxiosRequestConfig,
  ): Promise<HttpCommonResponse<T>> => {
    const cleanedData = cleanParams(requestBody || {})

    const response = await axiosInstance.post<HttpCommonResponse<T>>(
      endpoint,
      cleanedData,
      requestConfig,
    )
    return response.data
  },

  /**
   * PUT request with custom config (without default baseURL)
   * Use this when you need to call external APIs or override baseURL
   * @template T - Response data type (can be any type)
   * @template P - Request body data type
   * @param endpoint - API endpoint
   * @param requestBody - Data to update (optional)
   * @param requestConfig - Custom axios config
   * @returns Promise with API response data
   */
  putConfig: async <T>(
    endpoint: string,
    requestBody?: object,
    requestConfig?: AxiosRequestConfig,
  ): Promise<HttpCommonResponse<T>> => {
    const cleanedData = cleanParams(requestBody || {})

    const response = await axiosInstance.put<HttpCommonResponse<T>>(
      endpoint,
      cleanedData,
      requestConfig,
    )
    return response.data
  },

  /**
   * DELETE request with custom config (without default baseURL)
   * Use this when you need to call external APIs or override baseURL
   * @template T - Response data type (can be any type)
   * @param endpoint - API endpoint
   * @param requestConfig - Custom axios config
   * @returns Promise with API response data
   */
  deleteConfig: async <T>(
    endpoint: string,
    requestConfig?: AxiosRequestConfig,
  ): Promise<HttpCommonResponse<T>> => {
    const response = await axiosInstance.delete<HttpCommonResponse<T>>(
      endpoint,
      requestConfig,
    )
    return response.data
  },
  // postMultipart: async <P extends IUploadImageRequest, T>(url: string, data: P, config?: AxiosRequestConfig): Promise<HttpCommonResponse<T>> => {
  //   const formData = new FormData() as any;
  //   formData.append("upload", {
  //     uri: data.upload.uri,
  //     name: data.upload.fileName || "image.jpg",
  //     type: data.upload.mimeType || "image/jpeg",
  //   });

  //   const token = await TOKEN_STORAGE.getTokens();

  //   const response = await axiosInstance.post<HttpCommonResponse<T>>(url, formData, {
  //     ...config,
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       ...config?.headers,
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //   return response.data;

  // }
}
