import type { IconName } from '#/components/icon'
import Text from '#/components/text'
import { useTranslation } from 'react-i18next'
import BookingItem from './BookingItem'
import { useSearch } from '@tanstack/react-router'

export default function BookingOffline() {
  const { t } = useTranslation(['book-appointment'])
  const search = useSearch({
    from: '/app/book-appointment/(commonLayout)',
  })
  const { country } = search as { country: string }

  const BOOKING_OFFLINE_ITEMS: {
    title: string
    description: string
    icon: IconName
    href: string
  }[] = [
    {
      title: t('bookingOffline.bookByHospital'),
      description: t('bookingOffline.bookByHospitalDescription'),
      icon: 'hospital',
      href: country ? `/app/hospital?country=${country}` : '/app/hospital',
    },
    {
      title: t('bookingOffline.bookByMedicalPackage'),
      description: t('bookingOffline.bookByMedicalPackageDescription'),
      icon: 'medical_web_service_solid',
      href: country ? `/app/package?country=${country}` : '/app/package',
    },
    {
      title: t('bookingOffline.bookByDoctor'),
      description: t('bookingOffline.bookByDoctorDescription'),
      icon: 'user_doctor_solid',
      href: country ? `/app/doctor?country=${country}` : '/app/doctor',
    },
  ]

  return (
    <>
      <Text
        size="sm_12"
        className="font-medium tracking-[0.03em] text-muted-foreground uppercase"
      >
        {t('bookingOffline.title')}
      </Text>
      {BOOKING_OFFLINE_ITEMS.map((item) => (
        <BookingItem
          key={item.title}
          title={item.title}
          description={item.description}
          icon={item.icon}
          href={item.href}
        />
      ))}
    </>
  )
}
