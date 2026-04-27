import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { DATE_TIME_TYPE, formatDate } from '#/utils'
import { createFileRoute, Link, useParams } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute(
  '/app/book-appointment/success/$appointmentCode',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['appointment'])
  const { appointmentCode } = useParams({
    from: '/app/book-appointment/success/$appointmentCode',
  })

  const handleCopyBookingId = async () => {
    try {
      await navigator.clipboard.writeText(appointmentCode)
      toast.success(t('bookingIdCopied'))
    } catch {
      toast.error(t('failedToCopyBookingId'))
    }
  }

  return (
    <div className="relative mt-[60px] px-[15px]">
      <div className="flex flex-col items-center justify-center gap-[16px]">
        <Icon name="booking_success" className="text-white" />
        <div className="flex flex-col items-center justify-center gap-[10px]">
          <Text
            size="4xl_24"
            className="text-center font-semibold leading-normal text-black"
          >
            {t('bookingRequestReceived')}
          </Text>
          <Text className="text-center leading-normal text-muted-foreground">
            {t('bookingRequestReceivedDescription')}
          </Text>
          <div className="flex items-center gap-[8px]">
            <Text className="font-medium leading-normal text-muted-foreground">
              {t('bookingIdLabel')}{' '}
              <span className="text-dust-red-8">#{appointmentCode}</span>
            </Text>
            <button
              type="button"
              onClick={handleCopyBookingId}
              aria-label={t('copyBookingId')}
            >
              <Icon name="copy" className="w-[16px] h-[16px] text-dust-red-8" />
            </button>
          </div>
          <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
            {formatDate(
              new Date().toISOString(),
              DATE_TIME_TYPE.MMM_DD_YYYY_HH_mm_A,
            )}
          </Text>
        </div>
      </div>

      <div
        className="mt-[40px] flex flex-col gap-[12px]
      rounded-[12px] px-[16px] py-[20px] bg-[#F0B1330D] border-l-4 border-[#F0B133]
      "
      >
        <div className="flex items-center gap-[8px]">
          <Icon name="warning" className="w-[15px] h-[15px] text-[#F0B133]" />
          <Text className="font-semibold leading-[1.2] text-[#F0B133]">
            {t('importantReminders')}
          </Text>
        </div>
        <div className="flex flex-col gap-[8px]">
          <div className="flex items-center gap-[8px]">
            <div className="flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#F0B133]" />
            <Text size="sm_12" className="leading-[1.3] text-[#334155]">
              {t('reminderArriveEarly')}
            </Text>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#F0B133]" />
            <Text size="sm_12" className="leading-[1.3] text-[#334155]">
              {t('reminderBringId')}
            </Text>
          </div>
          <div className="flex items-center gap-[8px]">
            <div className="flex h-[6px] w-[6px] items-center justify-center rounded-full bg-[#F0B133]" />
            <Text size="sm_12" className="leading-[1.3] text-[#334155]">
              {t('reminderBringMedicalRecords')}
            </Text>
          </div>
        </div>
      </div>

      <div
        className="fixed bottom-0 left-0 right-0 flex flex-col gap-[16px] px-[20px] pb-[35px] pt-[10px]
      "
      >
        <Button className="h-[45px] w-full rounded-[40px] bg-primary" asChild>
          <Link to="/app/history">
            <Text className="font-medium leading-normal text-white">
              {t('viewMyBooking')}
            </Text>
          </Link>
        </Button>

        <Button className="h-[45px] w-full rounded-[40px] bg-[#E6E6E6]" asChild>
          <Link to="/app/home">
            <Text className="font-medium leading-normal text-[#333333]">
              {t('goToHomepage')}
            </Text>
          </Link>
        </Button>
      </div>
    </div>
  )
}
