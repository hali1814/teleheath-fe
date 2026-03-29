import { PackageCard } from '#/sections/package'
import { Link } from '@tanstack/react-router'
import Text from '#/components/text'
import { useTranslation } from 'react-i18next'
import type { Package } from '#/types/package'

export default function PackageList({
  title,
  href,
  packages,
}: {
  title: string
  href: string
  packages: Package[]
}) {
  const { t } = useTranslation(['common'])

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex items-center justify-between px-[16px]">
        <Text size="base_14" className="font-semibold leading-[1.2]">
          {title}
        </Text>
        <Link to={href}>
          <Text
            size="sm_12"
            className="font-medium leading-none text-dust-red-8"
          >
            {t('actions.viewAll')}
          </Text>
        </Link>
      </div>

      <div className="w-full flex gap-[14px] overflow-x-auto pl-[16px] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {packages.map((p) => (
          <PackageCard
            key={p.id}
            {...p}
            className="w-[60%] max-w-[300px]"
            sizeThumbnail="full"
          />
        ))}
        <div className="w-[16px]" />
      </div>
    </div>
  )
}
