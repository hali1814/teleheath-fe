import { toast } from 'sonner'

const TELEHEALTH_AUTHEN_KEY = 'TELEHEALTH_AUTHEN'

export const goBackToAppMobile = () => {
  if (typeof window === 'undefined') return

  const path = `${window.location.pathname}${window.location.search}${window.location.hash}`
  const payload = { [TELEHEALTH_AUTHEN_KEY]: path }
  const message = JSON.stringify(payload)

  const appWindow = window as Window & {
    ReactNativeWebView?: { postMessage?: (message: string) => void }
    webkit?: {
      messageHandlers?: Partial<
        Record<
          string,
          {
            postMessage?: (message: string | Record<string, string>) => void
          }
        >
      >
    }
    Android?: {
      postMessage?: (message: string) => void
      TELEHEALTH_AUTHEN?: (path: string) => void
    }
    TELEHEALTH_AUTHEN?: (path: string) => void
  }

  const send = (
    handler: unknown,
    data: string | Record<string, string>
  ): boolean => {
    if (typeof handler !== 'function') return false
    try {
      ;(handler as (payload: string | Record<string, string>) => void)(data)
      return true
    } catch (_error) {
      // Ignore bridge errors and continue trying other channels.
      return false
    }
  }

  const isSent = [
    // React Native WebView bridge (common for both iOS/Android)
    send(appWindow.ReactNativeWebView?.postMessage, message),
    // iOS WKWebView bridge by key-based handler
    send(
      appWindow.webkit?.messageHandlers?.[TELEHEALTH_AUTHEN_KEY]?.postMessage,
      payload
    ),
    // iOS WKWebView generic message handler
    send(appWindow.webkit?.messageHandlers?.message?.postMessage, message),
    // Android bridge patterns
    send(appWindow.Android?.postMessage, message),
    send(appWindow.Android?.TELEHEALTH_AUTHEN, path),
    // Direct global bridge fallback
    send(appWindow.TELEHEALTH_AUTHEN, path),
  ].some(Boolean)

  if (!isSent) {
    toast.error('Please login to continue')
  }
}
