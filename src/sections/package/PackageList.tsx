import { PackageCard } from '#/sections/package'
import { Link } from '@tanstack/react-router'
import Text from '#/components/text'
import { useTranslation } from 'react-i18next'

interface Package {
  id: string
  name: string
  location: string
  price: number
  imageUrl: string
}

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
      <div className="flex items-center justify-between">
        <Text size="base_14" className="font-medium leading-[1.2]">
          {title}
        </Text>
        <Link to={href}>
          <Text size="sm_12" className="text-dust-red-8">
            {t('actions.viewAll')}
          </Text>
        </Link>
      </div>

      <div className="w-full flex flex-col gap-[14px]">
        {packages.map((p) => (
          <PackageCard key={p.id} {...p} />
        ))}
      </div>
    </div>
  )
}
