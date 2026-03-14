import type { ImgHTMLAttributes } from 'react'

import { cn } from '#/lib/utils'

type AspectRatio =
  | '361/180'
  | '16/9'
  | '4/3'
  | '1/1'
  | '3/4'
  | '9/16'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string
  aspectRatio?: AspectRatio
}

export default function Image({
  className,
  loading = 'lazy',
  decoding = 'async',
  aspectRatio,
  ...props
}: ImageProps) {
  const aspectClass = aspectRatio ? `aspect-[${aspectRatio}]` : undefined

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img
      loading={loading}
      decoding={decoding}
      className={cn('w-full object-cover', aspectClass, className)}
      {...props}
    />
  )
}

export type { ImageProps, AspectRatio }
