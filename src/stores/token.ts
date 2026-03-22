const STORAGE_KEY = 'telehealth-auth'
const LEGACY_TOKEN_KEY = 'token'

export type StoredTokens = {
  accessToken: string | null
  refreshToken: string | null
}

function readStored(): StoredTokens {
  if (typeof localStorage === 'undefined') {
    return { accessToken: null, refreshToken: null }
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const p = JSON.parse(raw) as Partial<StoredTokens>
      return {
        accessToken:
          typeof p.accessToken === 'string' && p.accessToken.length > 0
            ? p.accessToken
            : null,
        refreshToken:
          typeof p.refreshToken === 'string' && p.refreshToken.length > 0
            ? p.refreshToken
            : null,
      }
    }
  } catch {
    /* ignore */
  }
  const legacy = localStorage.getItem(LEGACY_TOKEN_KEY)
  if (legacy && legacy.length > 0) {
    return { accessToken: legacy, refreshToken: null }
  }
  return { accessToken: null, refreshToken: null }
}

function writeStored(next: StoredTokens): void {
  if (typeof localStorage === 'undefined') return
  const { accessToken, refreshToken } = next
  if (!accessToken && !refreshToken) {
    localStorage.removeItem(STORAGE_KEY)
    return
  }
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ accessToken, refreshToken }),
  )
}

/** Đọc access token (axios header, router beforeLoad) */
export function getToken(): string | null {
  return readStored().accessToken
}

/** Đọc refresh token (axios interceptor refresh flow) */
export function getRefreshToken(): string | null {
  return readStored().refreshToken
}

/** Ghi access token; `null` = xóa access (giữ refresh nếu có) */
export function setToken(token: string | null): void {
  const s = readStored()
  writeStored({ ...s, accessToken: token })
  if (localStorage?.getItem(LEGACY_TOKEN_KEY)) {
    localStorage.removeItem(LEGACY_TOKEN_KEY)
  }
}

/** Ghi refresh token */
export function setRefreshToken(token: string | null): void {
  const s = readStored()
  writeStored({ ...s, refreshToken: token })
}

/** Ghi một lúc; truyền `undefined` để giữ giá trị cũ */
export function setTokens(tokens: {
  accessToken?: string | null
  refreshToken?: string | null
}): void {
  const s = readStored()
  writeStored({
    accessToken:
      tokens.accessToken !== undefined ? tokens.accessToken : s.accessToken,
    refreshToken:
      tokens.refreshToken !== undefined ? tokens.refreshToken : s.refreshToken,
  })
  if (localStorage?.getItem(LEGACY_TOKEN_KEY)) {
    localStorage.removeItem(LEGACY_TOKEN_KEY)
  }
}

/** Xóa hết token đã lưu */
export function clearTokens(): void {
  if (typeof localStorage === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
  localStorage.removeItem(LEGACY_TOKEN_KEY)
}

/** @deprecated dùng `getToken` */
export function getAccessTokenSync(): string | null {
  return getToken()
}
