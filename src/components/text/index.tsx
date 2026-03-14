import type { ElementType, ReactNode } from 'react'

import { cn } from '#/lib/utils'

type TextColor = 'primary' | 'secondary' | 'tertiary' | 'quaternary'

const colorClasses: Record<TextColor, string> = {
  primary: 'text-text-primary',
  secondary: 'text-text-secondary',
  tertiary: 'text-text-tertiary',
  quaternary: 'text-text-quaternary',
}

interface TextProps {
  as?: ElementType
  children: ReactNode
  className?: string
  color?: TextColor
}

export default function Text({
  as: Component = 'p',
  children,
  className,
  color = 'primary',
}: TextProps) {
  return (
    <Component className={cn(colorClasses[color], className)}>
      {children}
    </Component>
  )
}

export type { TextColor, TextProps }
