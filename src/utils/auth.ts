import { toast } from 'sonner'

const TELEHEALTH_AUTHEN_KEY = 'TELEHEALTH_AUTHEN'
const WEB_END_SESSION = 'WEB_END_SESSION'

type NativeBridgeWindow = Window & {
  Android?: {
    postMessage?: (message: string) => void
  } & Record<string, ((value?: string) => void) | undefined>
  ReactNativeWebView?: { postMessage?: (message: string) => void }
  webkit?: {
    messageHandlers?: Record<
      string,
      { postMessage?: (message: string | Record<string, string>) => void }
    >
  }
} & Record<string, ((value?: string) => void) | undefined>

interface BridgeMessageOptions {
  key: string
  payload: Record<string, string>
  nativeMethodName: string
  nativeMethodValue: string
  errorContext: string
  toastMessage: string
}

const postMessageToNativeBridge = ({
  key,
  payload,
  nativeMethodName,
  nativeMethodValue,
  errorContext,
  toastMessage,
}: BridgeMessageOptions) => {
  if (typeof window === 'undefined') return

  const appWindow = window as unknown as NativeBridgeWindow
  const message = JSON.stringify(payload)
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
    const androidMethod = appWindow.Android?.[nativeMethodName]
    if (!isSent && androidMethod) {
      androidMethod(nativeMethodValue)
      isSent = true
    }
  } catch (e) {
    console.error(`Android.${nativeMethodName} failed`, e)
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
    if (!isSent && appWindow.webkit?.messageHandlers?.[key]?.postMessage) {
      appWindow.webkit.messageHandlers[key].postMessage(payload)
      isSent = true
    }
  } catch (e) {
    console.error(`webkit ${key} handler failed`, e)
  }

  try {
    const globalMethod = appWindow[nativeMethodName]
    if (!isSent && globalMethod) {
      globalMethod(nativeMethodValue)
      isSent = true
    }
  } catch (e) {
    console.error(`global ${nativeMethodName} failed`, e)
  }

  if (!isSent) {
    console.error(`No native bridge available for ${errorContext}`, {
      hasAndroid: !!appWindow.Android,
      hasAndroidPostMessage: typeof appWindow.Android?.postMessage,
      hasAndroidMethod: typeof appWindow.Android?.[nativeMethodName],
    })
    toast.error(toastMessage)
  }
}

export const goBackToAppMobile = () => {
  if (typeof window === 'undefined') return

  const path = `${window.location.pathname}${window.location.search}${window.location.hash}`
  const payload = { [TELEHEALTH_AUTHEN_KEY]: path }

  postMessageToNativeBridge({
    key: TELEHEALTH_AUTHEN_KEY,
    payload,
    nativeMethodName: TELEHEALTH_AUTHEN_KEY,
    nativeMethodValue: path,
    errorContext: TELEHEALTH_AUTHEN_KEY,
    toastMessage: 'Please login to continue',
  })
}

export const endSession = () => {
  if (typeof window === 'undefined') return

  const payload = { [WEB_END_SESSION]: 'true' }

  postMessageToNativeBridge({
    key: WEB_END_SESSION,
    payload,
    nativeMethodName: WEB_END_SESSION,
    nativeMethodValue: payload[WEB_END_SESSION],
    errorContext: WEB_END_SESSION,
    toastMessage: 'Cannot end session on this device',
  })
}
