import type { IconName } from '#/components/icon'
import Text from '#/components/text'
import { useTranslation } from 'react-i18next'
import BookingItem from './BookingItem'

export default function BookingOffline() {
  const { t } = useTranslation(['book-appointment'])

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
      href: '/app/hospital',
    },
    {
      title: t('bookingOffline.bookByMedicalPackage'),
      description: t('bookingOffline.bookByMedicalPackageDescription'),
      icon: 'medical_web_service_solid',
      href: '/app/package',
    },
    {
      title: t('bookingOffline.bookByDoctor'),
      description: t('bookingOffline.bookByDoctorDescription'),
      icon: 'user_doctor_solid',
      href: '/app/doctor',
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
