import { useEffect, useState, type ImgHTMLAttributes } from 'react'

import { cn } from '#/lib/utils'

type AspectRatio = '361/180' | '16/9' | '4/3' | '1/1' | '3/4' | '9/16'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  aspectRatio?: AspectRatio
}

export default function Image({
  className,
  loading = 'eager',
  decoding = 'async',
  aspectRatio,
  src,
  onError,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)
  const aspectClass = aspectRatio ? `aspect-[${aspectRatio}]` : undefined
  const [srcDisplay, setSrcDisplay] = useState(src)

  // Prop `src` thường đến sau (API). Chỉ dùng useState(src) lần mount sẽ không cập nhật khi URL có.
  useEffect(() => {
    setSrcDisplay(src ?? '')
  }, [src])

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      loading={loading}
      decoding={decoding}
      className={cn('w-full object-cover', aspectClass, className)}
      src={srcDisplay}
      onError={(event) => {
        setSrcDisplay('/logo.svg')
        onError?.(event)
      }}
      {...props}
    />
  )
}

export type { ImageProps, AspectRatio }
