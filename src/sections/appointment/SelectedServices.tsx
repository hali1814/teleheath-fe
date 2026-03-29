import { Icon } from '#/components/icon'
import Text from '#/components/text'
import type { MyAppointmentItem } from '#/services/query/appointment/my-appointments'
import { useTranslation } from 'react-i18next'

export interface SelectedServicesProps {
  services?: MyAppointmentItem['services']
}

export default function SelectedServices({ services }: SelectedServicesProps) {
  const { t } = useTranslation(['appointment'])

  if (!services?.length) {
    return null
  }

  return (
    <div className="mt-4 rounded-[12px] bg-white p-4">
      <Text
        size="lg_16"
        className="font-semibold leading-[19px] text-text-primary"
      >
        {t('selectedServices')}
      </Text>

      <div className="mt-4 flex flex-col gap-4">
        {services.map((service, index) => (
          <div
            key={`${service.id}-${index}-${service.name}`}
            className="flex items-center gap-4"
          >
            <div className="flex size-10 shrink-0 items-center justify-center rounded-[50px] bg-[#D331311A]">
              <Icon name="appointment_heath" className="size-5" aria-hidden />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              <Text
                size="base_14"
                className="font-normal leading-[21px] text-[#64748B]"
              >
                {service.name}
              </Text>
              {Number.isFinite(service.price) ? (
                <Text
                  size="sm_12"
                  className="font-medium leading-4 text-text-primary"
                >
                  ${service.price}
                </Text>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
