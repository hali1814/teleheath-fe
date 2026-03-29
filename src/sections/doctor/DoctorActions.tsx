import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Link, useParams } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export default function DoctorActions() {
  const { t } = useTranslation(['common'])
  const { id } = useParams({
    from: '/app/doctor/(commonLayout)/$id',
  })
  return (
    <div className="fixed bottom-0 left-0 right-0 w-full flex flex-col gap-[15px] pt-[10px] pb-[35px] px-[20px] bg-background">
      <Button
        className="w-full h-[45px] bg-primary gap-[10px] rounded-[40px]"
        asChild
      >
        <Link
          to="/app/book-appointment/doctor/$doctorId"
          params={{ doctorId: id }}
        >
          <Icon
            name="book_appointment"
            className="w-[20px] h-[20px] text-white"
          />
          <Text className="font-medium leading-normal text-white">
            {t('actions.bookingOffline')}
          </Text>
        </Link>
      </Button>
    </div>
  )
}
