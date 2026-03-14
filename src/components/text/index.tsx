import type { ElementType, ReactNode } from 'react'

import { cn } from '#/lib/utils'

type TextColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary'
type TextSize =
  | 'xs_10'
  | 'sm_12'
  | 'base_14'
  | 'lg_16'
  | 'xl_18'
  | '2xl_20'
  | '3xl_22'
  | '4xl_24'
  | '5xl_28'

const colorClasses: Record<TextColor, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  tertiary: 'text-text-tertiary',
  quaternary: 'text-text-quaternary',
}

const sizeClasses: Record<TextSize, string> = {
  xs_10: 'text-xs',
  sm_12: 'text-sm',
  base_14: 'text-base',
  lg_16: 'text-lg',
  xl_18: 'text-xl',
  '2xl_20': 'text-2xl',
  '3xl_22': 'text-3xl',
  '4xl_24': 'text-4xl',
  '5xl_28': 'text-5xl',
}

interface TextProps {
  as?: ElementType
  children: ReactNode
  className?: string
  color?: TextColor
  size?: TextSize
}

export default function Text({
  as: Component = 'div',
  children,
  className,
  color = 'primary',
  size = 'base_14',
}: TextProps) {
  return (
    <Component
      className={cn(colorClasses[color], sizeClasses[size], className)}
    >
      {children}
    </Component>
  )
}

export type { TextColor, TextProps, TextSize }
