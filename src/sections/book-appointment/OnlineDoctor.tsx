import type { IconName } from '#/components/icon'
import Text from '#/components/text'
import { useTranslation } from 'react-i18next'
import BookingItem from './BookingItem'

export default function OnlineDoctor() {
  const { t } = useTranslation(['book-appointment'])

  const ONLINE_DOCTOR_ITEMS: {
    title: string
    description: string
    icon: IconName
  }[] = [
    {
      title: t('onlineDoctor.bookByDoctor'),
      description: t('onlineDoctor.bookByDoctorDescription'),
      icon: 'call_doctor',
    },
  ]

  return (
    <>
      <Text
        size="sm_12"
        className="font-medium tracking-[0.03em] text-muted-foreground uppercase"
      >
        {t('onlineDoctor.title')}
      </Text>
      {ONLINE_DOCTOR_ITEMS.map((item) => (
        <BookingItem
          key={item.title}
          title={item.title}
          description={item.description}
          icon={item.icon}
        />
      ))}
    </>
  )
}
