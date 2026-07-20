import { Icon } from '#/components/icon'
import Text from '#/components/text'
import type { MyAppointmentItem } from '#/services/query/appointment/my-appointments'
import { formatPrice } from '#/utils/price.util'
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
        {services.map((service, index) => {
          // Màn lịch sử hiển thị ĐƠN GIÁ lúc mua (snapshot), không phải giá tổng.
          // BE trả price = tổng đã trừ KM (unit×qty − discount) từ appointment_addon (đã freeze
          // lúc booking); đơn giá = (price + discount) / quantity → catalog đổi giá sau KHÔNG ảnh hưởng.
          const qty =
            typeof service.quantity === 'number' && service.quantity > 0
              ? service.quantity
              : 1
          const unitPrice = Number.isFinite(service.price)
            ? (service.price + (service.discountAmount ?? 0)) / qty
            : NaN
          return (
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
                {typeof service.quantity === 'number' && service.quantity > 1
                  ? ` ×${service.quantity}`
                  : ''}
              </Text>
              {Number.isFinite(unitPrice) ? (
                <Text
                  size="sm_12"
                  className="font-medium leading-4 text-text-primary"
                >
                  {formatPrice(unitPrice)}
                </Text>
              ) : null}
              {typeof service.discountAmount === 'number' &&
              service.discountAmount > 0 ? (
                <Text
                  size="sm_12"
                  className="font-medium leading-4 text-[#059669]"
                >
                  {`- ${formatPrice(service.discountAmount)}`}
                </Text>
              ) : null}
            </div>
          </div>
          )
        })}
      </div>
    </div>
  )
}
