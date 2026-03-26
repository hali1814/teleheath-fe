import { Link } from '@tanstack/react-router'
import { DoctorCard } from '#/sections/doctor'
import Text from '#/components/text'
import { useTranslation } from 'react-i18next'
import type { Doctor } from '#/types/doctor'

export default function DoctorLists({
  title,
  href,
  doctors,
}: {
  title: string
  href: string
  doctors: Doctor[]
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
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.doctorId} {...doctor} className="w-[60%]" />
        ))}
        <div className="w-[16px]" />
      </div>
    </div>
  )
}
