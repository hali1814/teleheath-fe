import HomeTestIcon from '#/assets/icons/home/test.svg?react'
import type { SVGProps, FC } from 'react'

type IconComponent = FC<SVGProps<SVGSVGElement>>

const ICONS_TEMPLATE = {
  home_test: HomeTestIcon,
} satisfies Record<string, IconComponent>

export default ICONS_TEMPLATE
