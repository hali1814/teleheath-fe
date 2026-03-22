import type { CSSProperties, ElementType, ReactNode } from 'react'

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
  | '6xl_32'
  | '7xl_36'
  | '8xl_40'
  | '9xl_44'
  | '10xl_48'

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
  '6xl_32': 'text-6xl',
  '7xl_36': 'text-7xl',
  '8xl_40': 'text-8xl',
  '9xl_44': 'text-9xl',
  '10xl_48': 'text-10xl',
}

interface TextProps {
  as?: ElementType
  children: ReactNode
  className?: string
  color?: TextColor
  size?: TextSize
  style?: CSSProperties
}

export default function Text({
  as: Component = 'div',
  children,
  className,
  color = 'primary',
  size = 'base_14',
  style,
}: TextProps) {
  return (
    <Component
      className={cn(colorClasses[color], sizeClasses[size], className)}
      style={style}
    >
      {children}
    </Component>
  )
}

export type { TextColor, TextProps, TextSize }
