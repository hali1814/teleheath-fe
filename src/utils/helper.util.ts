/* eslint-disable @typescript-eslint/no-explicit-any */
export const cleanParams = (params: Record<string, any>) => {
  if (!params) return params
  return Object.fromEntries(
    Object.entries(params).filter(([_, value]) => {
      // Keep 0 and false as they are valid values
      if (value === 0 || value === false) return true
      // Remove other falsy values
      return value !== undefined && value !== null && !Number.isNaN(value)
    }),
  )
}

export const isVideo = (media: string) => {
  return ['.mp4', '.webm', '.ogg', '.mov', '.avi'].some((ext) =>
    media.toLowerCase().endsWith(ext),
  )
}

export const getDomainWebsite = (website: string) => {
  if (!website) return null
  if (website.includes('http')) {
    return new URL(website).hostname
  }
  return website
}
