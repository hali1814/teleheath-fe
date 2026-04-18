import { toast } from 'sonner'

const TELEHEALTH_AUTHEN_KEY = 'TELEHEALTH_AUTHEN'
const WEB_END_SESSION = 'WEB_END_SESSION'
const DOWNLOAD_IMAGE = 'DOWNLOAD_IMAGE'
const WEB_INTENT = 'WEB_INTENT'
const NATIVE_BRIDGE_THROTTLE_MS = 1000
let lastGoBackBridgeSentAt = 0
let lastDownloadImageBridgeSentAt = 0
let lastWebIntentBridgeSentAt = 0

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
    if (!isSent && appWindow.Android?.[nativeMethodName]) {
      appWindow.Android[nativeMethodName]?.(nativeMethodValue)
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
    if (!isSent && appWindow[nativeMethodName]) {
      appWindow[nativeMethodName]?.(nativeMethodValue)
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

  const now = Date.now()
  if (now - lastGoBackBridgeSentAt < NATIVE_BRIDGE_THROTTLE_MS) return
  lastGoBackBridgeSentAt = now

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

export const downloadImage = (base64: string) => {
  if (typeof window === 'undefined') return

  const now = Date.now()
  if (now - lastDownloadImageBridgeSentAt < NATIVE_BRIDGE_THROTTLE_MS) return
  lastDownloadImageBridgeSentAt = now

  const payload = { [DOWNLOAD_IMAGE]: base64 }

  postMessageToNativeBridge({
    key: DOWNLOAD_IMAGE,
    payload,
    nativeMethodName: DOWNLOAD_IMAGE,
    nativeMethodValue: base64,
    errorContext: DOWNLOAD_IMAGE,
    toastMessage: 'Cannot download image',
  })
}

export const webIntent = (url: string) => {
  if (typeof window === 'undefined') return

  const now = Date.now()
  if (now - lastWebIntentBridgeSentAt < NATIVE_BRIDGE_THROTTLE_MS) return
  lastWebIntentBridgeSentAt = now

  const payload = { [WEB_INTENT]: url }

  postMessageToNativeBridge({
    key: WEB_INTENT,
    payload,
    nativeMethodName: WEB_INTENT,
    nativeMethodValue: url,
    errorContext: WEB_INTENT,
    toastMessage: 'Cannot open web intent',
  })
}
