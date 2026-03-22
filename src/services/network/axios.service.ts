import { getRouter } from '#/router-instance'
import { clearProfile } from '#/stores/profile'
import { clearTokens, getToken } from '#/stores/token'
import axios, {
  AxiosError,
  type AxiosResponse,
  HttpStatusCode,
  type InternalAxiosRequestConfig,
} from 'axios'
import { toast } from 'sonner'

export const axiosInstance = axios.create({
  baseURL: 'http://103.173.226.3:8080/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

function rejectAxiosError(error: AxiosError) {
  return Promise.reject(
    typeof error.response?.data === 'object' &&
      error.response.status !== HttpStatusCode.NotFound
      ? error.response?.data
      : error,
  )
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error?.response?.status === HttpStatusCode.Unauthorized) {
      const path = typeof window !== 'undefined' ? window.location.pathname : ''
      if (path === '/app/entry' || path.startsWith('/app/entry/')) {
        return rejectAxiosError(error)
      }

      clearTokens()
      clearProfile()

      const r = getRouter()
      if (r) {
        void r.navigate({ to: '/app/entry', replace: true })
      } else if (typeof window !== 'undefined') {
        window.location.assign('/app/entry')
      }

      toast.error('Session expired', {
        description: 'Please login again.',
      })

      return rejectAxiosError(error)
    }
    if (error?.code === 'ERR_NETWORK') {
      toast.error('Connection error', {
        description: 'Please check your internet connection.',
      })
    }
    return rejectAxiosError(error)
  },
)
