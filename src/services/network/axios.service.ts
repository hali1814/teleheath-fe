import i18n, { type AppLanguage } from '#/i18n'
import { getRouter } from '#/router-instance'
import { clearProfile } from '#/stores/profile'
import {
  clearTokens,
  getRefreshToken,
  getToken,
  setTokens,
} from '#/stores/token'
import { endSession } from '#/utils/auth'
import axios, {
  AxiosError,
  type AxiosResponse,
  HttpStatusCode,
  type InternalAxiosRequestConfig,
} from 'axios'
import { toast } from 'sonner'

/**
 * - **Dev (`pnpm dev`)**: gọi thẳng IP (Vite proxy `/api` cũng được nếu đặt env).
 * - **Vercel (HTTPS)**: không được gọi `http://IP` từ browser → Mixed Content / ERR_NETWORK.
 *   Build production dùng **`/api`** → `vercel.json` proxy sang backend.
 * - Override: `VITE_API_BASE_URL` (Vercel → Environment Variables, rebuild).
 */
function getApiBaseURL(): string {
  const fromEnv = import.meta.env.VITE_API_BASE_URL
  if (fromEnv !== undefined && fromEnv !== '') {
    return fromEnv.replace(/\/$/, '')
  }
  if (import.meta.env.PROD) {
    return '/api'
  }
  return 'http://teleheath.site/api'
}

export const axiosInstance = axios.create({
  baseURL: getApiBaseURL(),
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getToken()
    const language = i18n.language as AppLanguage
    if (language) {
      config.headers['Accept-Language'] = language
    }
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // Default instance sets Content-Type: application/json — that breaks multipart
    // uploads (server expects multipart/form-data + boundary). Let axios set it.
    if (config.data instanceof FormData) {
      config.headers.delete('Content-Type')
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

let isRefreshing = false
let failedQueue: {
  resolve: (value: unknown) => void
  reject: (reason?: any) => void
}[] = []
let endSessionDebounceTimer: ReturnType<typeof setTimeout> | null = null

const debounceEndSession = () => {
  if (endSessionDebounceTimer) return

  endSession()
  endSessionDebounceTimer = setTimeout(() => {
    endSessionDebounceTimer = null
  }, 1000)
}

const processQueue = (error: AxiosError | null, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  failedQueue = []
}

const handleLogoutClearData = () => {
  clearTokens()
  clearProfile()
  const r = getRouter()
  if (r) {
    debounceEndSession()
    void r.navigate({
      to: '/app/entry',
      replace: true,
      params: { token: 'guest' },
    })
    // window.location.reload()
  }
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error?.response?.status === HttpStatusCode.Unauthorized) {
      const originalRequest = error.config
      const path = typeof window !== 'undefined' ? window.location.pathname : ''
      if (path === '/app/entry' || path.startsWith('/app/entry/')) {
        return rejectAxiosError(error)
      }

      if (!originalRequest) {
        return rejectAxiosError(error)
      }

      // Refresh 401 must not enter the queue/retry branch: isRefreshing is still true,
      // so we'd return a pending queue Promise and the outer await never rejects (no catch/finally).
      if (originalRequest.url?.includes('/auth/token/refresh')) {
        isRefreshing = false
        processQueue(error, null)
        return rejectAxiosError(error)
      }

      // Thêm đoạn này
      if ((originalRequest as any)._retry) {
        handleLogoutClearData()
        return rejectAxiosError(error)
      }

      ;(originalRequest as any)._retry = true

      if (getRefreshToken()) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          }).then((token) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token
            return axios(originalRequest)
          })
        }
        isRefreshing = true
        try {
          const { data } = await axiosInstance.post('/auth/token/refresh', {
            refreshToken: getRefreshToken(),
          })

          if (data.success) {
            setTokens({
              accessToken: data.data.accessToken,
              refreshToken: data.data.refreshToken,
            })

            processQueue(null, data.data.accessToken)

            originalRequest.headers['Authorization'] =
              'Bearer ' + data.data.accessToken

            return axios(originalRequest)
          } else {
            processQueue(error, null)
            handleLogoutClearData()
            return rejectAxiosError(error)
          }
        } catch (error) {
          handleLogoutClearData()
          processQueue(error as AxiosError, null)
          return rejectAxiosError(error as AxiosError)
        } finally {
          isRefreshing = false
        }
      }

      handleLogoutClearData()
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
