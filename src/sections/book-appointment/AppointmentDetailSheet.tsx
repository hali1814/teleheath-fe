import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '#/components/ui/sheet'
import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import type { AppLanguage } from '#/i18n'
import { cn } from '#/lib/utils'
import { useBookingStore } from '#/stores/booking-store'
import { DATE_TIME_TYPE, formatDate } from '#/utils'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { formatPrice } from '#/utils/price.util'
import { useTranslation } from 'react-i18next'

export function AppointmentDetailSheet({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  const { i18n, t } = useTranslation([
    'book-appointment',
    'appointment',
    'common',
  ])
  const {
    branch,
    specialty,
    doctor,
    packageData,
    patientProfile,
    appointmentDate,
    startTime,
    endTime,
    bookingType,
  } = useBookingStore()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        showCloseButton={false}
        className="rounded-t-[24px] max-h-[85dvh] overflow-y-auto p-0 gap-0"
      >
        <SheetHeader className="flex-row items-center justify-between p-[20px] pb-[16px]">
          <SheetTitle asChild>
            <Text
              size="lg_16"
              className="font-semibold leading-[1.2] text-[#333333]"
            >
              {t('appointment:appointmentInformation')}
            </Text>
          </SheetTitle>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-[12px] py-[6px] rounded-[8px] bg-dust-red-1"
          >
            <Text
              size="sm_12"
              className="font-medium leading-[1.3] text-primary"
            >
              {t('common:actions.close')}
            </Text>
          </button>
        </SheetHeader>

        <div className="flex flex-col gap-[16px] px-[20px] pb-[24px]">
          <div className="h-[0.5px] bg-[#E6E6E6]" />

          <div className="flex items-start gap-[16px]">
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ED2630]/10">
              <Icon
                name="hospital"
                className="w-[20px] h-[20px] text-primary"
              />
            </div>
            <div className="flex-1 flex flex-col gap-[6px]">
              <Text
                size="base_14"
                className="leading-normal text-muted-foreground"
              >
                {t('appointment:hospitalAndBranch')}
              </Text>
              <Text
                size="lg_16"
                className="leading-[1.2] font-semibold text-[#333333]"
              >
                {getLocalizedTextByLang(
                  branch?.nameVi ?? '',
                  branch?.nameKh ?? '',
                  branch?.nameEn ?? '',
                  i18n.language as AppLanguage,
                )}
              </Text>
            </div>
          </div>

          <div className="h-[0.5px] bg-[#E6E6E6]" />

          <div className="flex items-start gap-[16px]">
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ED2630]/10">
              <Icon
                name="location_appointment"
                className="w-[20px] h-[20px] text-primary"
              />
            </div>
            <div className="flex-1 flex flex-col gap-[6px]">
              <Text
                size="base_14"
                className="leading-normal text-muted-foreground"
              >
                {t('appointment:address')}
              </Text>
              <Text
                size="base_14"
                className="leading-normal font-medium text-[#333333]"
              >
                {branch?.detailedAddress}
              </Text>
            </div>
          </div>

          <div className="h-[0.5px] bg-[#E6E6E6]" />

          <div className="flex items-start gap-[16px]">
            <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ED2630]/10">
              <Icon
                name="user_outline"
                className="w-[20px] h-[20px] text-primary"
              />
            </div>
            <div className="flex-1 flex flex-col gap-[6px]">
              <Text
                size="base_14"
                className="leading-normal text-muted-foreground"
              >
                {t('appointment:patient')}
              </Text>
              <Text
                size="base_14"
                className="leading-normal font-medium text-[#333333]"
              >
                {patientProfile?.fullName}
              </Text>
            </div>
          </div>

          <div className="flex items-center gap-[16px]">
            <div className="flex-1 flex flex-col gap-[4px] p-[12px] rounded-[8px] bg-dust-red-1 border border-dust-red-2">
              <Text
                size="xs_10"
                className="font-bold leading-[15px] text-dust-red-4 uppercase"
              >
                {t('appointment:date')}
              </Text>
              <Text className="leading-normal font-medium text-[#333333]">
                {formatDate(
                  appointmentDate,
                  DATE_TIME_TYPE.MMM_DD_YYYY,
                  i18n.language,
                )}
              </Text>
            </div>
            <div className="flex-1 flex flex-col gap-[4px] p-[12px] rounded-[8px] bg-dust-red-1 border border-dust-red-2">
              <Text
                size="xs_10"
                className="font-bold leading-[15px] text-dust-red-4 uppercase"
              >
                {t('appointment:time')}
              </Text>
              <Text className="leading-normal font-medium text-[#333333]">
                {startTime} - {endTime}
              </Text>
            </div>
          </div>

          {bookingType === 'DOCTOR' && doctor && (
            <>
              <div className="h-[0.5px] bg-[#E6E6E6]" />
              <Text size="lg_16" className="leading-[1.2] font-semibold">
                {t('appointment:medicalProfessional')}
              </Text>
              <div className="flex items-start gap-[16px]">
                <Image
                  src={doctor?.avatarUrl ?? ''}
                  alt={doctor?.name ?? ''}
                  className="w-[57px] h-[57px] rounded-full"
                />
                <div className="flex-1 flex flex-col gap-[8px]">
                  <Text className="leading-normal font-medium text-[#333333]">
                    {doctor?.name}
                  </Text>
                  <div
                    className={cn(
                      'grid gap-[8px] items-start',
                      (doctor?.specialties?.length ?? 0) > 1
                        ? 'grid-cols-2'
                        : 'grid-cols-1',
                    )}
                  >
                    {doctor?.specialties?.map((sp, index) => (
                      <Text
                        key={`${doctor?.doctorId}-spec-d-${index}`}
                        size="sm_12"
                        className="flex items-center gap-[8px] font-normal text-muted-foreground leading-[1.3]"
                      >
                        <div className="size-[4px] rounded-full bg-muted-foreground" />
                        {sp.name}
                      </Text>
                    ))}
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <Icon
                      name="money"
                      className="w-[16px] h-[16px] text-primary"
                    />
                    <Text className="font-medium leading-normal text-[#333333]">
                      {t('appointment:consultationWithAmount', {
                        amount: formatPrice(doctor?.consultationFee ?? 0),
                      })}
                    </Text>
                  </div>
                </div>
              </div>
            </>
          )}

          {bookingType === 'PACKAGE' && packageData && (
            <>
              <div className="h-[0.5px] bg-[#E6E6E6]" />
              <Text size="lg_16" className="leading-[1.2] font-semibold">
                {t('appointment:selectedPackageTitle')}
              </Text>
              <div className="flex items-center gap-[16px]">
                <Image
                  src={packageData?.imageUrl ?? ''}
                  alt={getLocalizedTextByLang(
                    packageData?.name ?? '',
                    '',
                    '',
                    i18n.language as AppLanguage,
                  )}
                  className="w-[57px] h-[57px] rounded-full"
                />
                <div className="flex flex-col gap-[10px]">
                  <Text className="leading-normal font-medium text-[#333333]">
                    {getLocalizedTextByLang(
                      packageData?.name ?? '',
                      '',
                      '',
                      i18n.language as AppLanguage,
                    )}
                  </Text>
                  <div className="flex items-center gap-[8px]">
                    <Icon
                      name="money"
                      className="w-[16px] h-[16px] text-primary"
                    />
                    {packageData?.promotionPrice != null &&
                    packageData?.price > packageData?.promotionPrice ? (
                      <div className="flex items-center gap-[8px]">
                        <Text
                          size="lg_16"
                          className="font-semibold leading-[1.2] text-primary"
                        >
                          {formatPrice(packageData?.promotionPrice)}
                        </Text>
                        <Text className="leading-normal text-muted-foreground line-through">
                          {formatPrice(packageData?.price)}
                        </Text>
                      </div>
                    ) : (
                      <Text className="font-medium leading-normal text-[#333333]">
                        {formatPrice(packageData?.price ?? 0)}
                      </Text>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {specialty && (
            <div className="flex items-center gap-[12px] bg-[#F8FAFC] p-[12px] rounded-[8px]">
              <Image
                src={specialty.iconUrl}
                alt={specialty.name}
                className="w-[20px] h-[20px]"
              />
              <Text className="flex-1 leading-normal font-medium">
                {t('appointment:specialtyWithName', {
                  name: specialty?.name ?? '',
                })}
              </Text>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
