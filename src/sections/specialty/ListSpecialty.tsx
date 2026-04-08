import { t } from 'i18next'
import SpecialtyItem from './SpecialtyItem'
import Text from '#/components/text'
import { Link } from '@tanstack/react-router'
import type { Specialty } from '#/entities/specialtyEntity'

export default function ListSpecialty({
  title,
  href,
  specialties,
}: {
  title: string
  href: string
  specialties: Specialty[]
}) {
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

      <div className="grid grid-cols-3 gap-y-[36px] py-[10px]">
        {specialties.map((specialty) => (
          <SpecialtyItem key={specialty.specialtyId} {...specialty} />
        ))}
      </div>
    </div>
  )
}
