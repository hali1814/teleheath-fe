import { toast } from 'sonner'

const TELEHEALTH_AUTHEN_KEY = 'TELEHEALTH_AUTHEN'

export const goBackToAppMobile = () => {
  if (typeof window === 'undefined') return

  const path = `${window.location.pathname}${window.location.search}${window.location.hash}`
  const payload = { [TELEHEALTH_AUTHEN_KEY]: path }
  const message = JSON.stringify(payload)

  const appWindow = window as Window & {
    Android?: {
      postMessage?: (message: string) => void
      TELEHEALTH_AUTHEN?: (path: string) => void
    }
    ReactNativeWebView?: { postMessage?: (message: string) => void }
    webkit?: {
      messageHandlers?: Record<
        string,
        { postMessage?: (message: string | Record<string, string>) => void }
      >
    }
    TELEHEALTH_AUTHEN?: (path: string) => void
  }

  let isSent = false

  try {
    if (appWindow.Android?.postMessage) {
      appWindow.Android.postMessage(message)
      isSent = true
    }
  } catch (e) {
    console.error('Android.postMessage failed', e)
  }

  try {
    if (!isSent && appWindow.Android?.TELEHEALTH_AUTHEN) {
      appWindow.Android.TELEHEALTH_AUTHEN(path)
      isSent = true
    }
  } catch (e) {
    console.error('Android.TELEHEALTH_AUTHEN failed', e)
  }

  try {
    if (!isSent && appWindow.ReactNativeWebView?.postMessage) {
      appWindow.ReactNativeWebView.postMessage(message)
      isSent = true
    }
  } catch (e) {
    console.error('ReactNativeWebView.postMessage failed', e)
  }

  try {
    if (
      !isSent &&
      appWindow.webkit?.messageHandlers?.[TELEHEALTH_AUTHEN_KEY]?.postMessage
    ) {
      appWindow.webkit.messageHandlers[TELEHEALTH_AUTHEN_KEY].postMessage(payload)
      isSent = true
    }
  } catch (e) {
    console.error('webkit handler failed', e)
  }

  try {
    if (!isSent && appWindow.TELEHEALTH_AUTHEN) {
      appWindow.TELEHEALTH_AUTHEN(path)
      isSent = true
    }
  } catch (e) {
    console.error('global TELEHEALTH_AUTHEN failed', e)
  }

  if (!isSent) {
    console.error('No native bridge available', {
      hasAndroid: !!appWindow.Android,
      hasAndroidPostMessage: typeof appWindow.Android?.postMessage,
      hasAndroidTelehealth: typeof appWindow.Android?.TELEHEALTH_AUTHEN,
    })
    toast.error('Please login to continue')
  }
}
