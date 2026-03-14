import type { SVGProps } from 'react'
import ICONS_TEMPLATE from '#/const/icon'

export type IconName = keyof typeof ICONS_TEMPLATE

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName
}

export function Icon({ name, ...props }: IconProps) {
  const Component = ICONS_TEMPLATE[name]
  return <Component {...props} />
}

export const iconMap = ICONS_TEMPLATE
