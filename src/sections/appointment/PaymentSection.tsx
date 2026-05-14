import Image from '#/components/image'
import Text from '#/components/text'
import { getBookingPaymentMethodMeta } from '#/const/payment-methods'
import type { MyAppointmentItem } from '#/services/query/appointment/my-appointments'
import { useTranslation } from 'react-i18next'
import { DATE_TIME_TYPE, formatDate } from '#/utils/date.util'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import type { AppLanguage } from '#/i18n'

function formatMoney(amount: number, currency: string) {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency?.trim() || 'USD',
    }).format(amount)
  } catch {
    return `${amount} ${currency}`
  }
}

export interface PaymentSectionProps {
  appointment?: MyAppointmentItem
}

export default function PaymentSection({ appointment }: PaymentSectionProps) {
  const { t, i18n } = useTranslation(['appointment'])
  const payment = appointment?.payment

  if (!payment || payment.status !== 'SUCCESS') {
    return null
  }

  const currency = payment.currency?.trim() || 'USD'
  const totalAmount = appointment?.totalAmount ?? 0
  const services = appointment?.services ?? []
  const lang = i18n.language as AppLanguage
  const methodMeta = getBookingPaymentMethodMeta(payment.method)
  const paidAtLabel = payment.paidAt
    ? formatDate(
        payment.paidAt,
        DATE_TIME_TYPE.MMM_DD_YYYY_HH_mm_A,
        i18n.language,
      )
    : ''

  const labelClass = 'text-[14px] font-normal leading-[150%] text-[#64748B]'
  const valueClass =
    'text-right text-[14px] font-medium leading-[150%] text-[#333333]'

  return (
    <div className="mt-4 rounded-[16px] bg-white p-4">
      <Text
        size="lg_16"
        className="inline-block pb-1 font-semibold leading-[1.2] text-[#0F172A]"
      >
        {t('paymentDetails')}
      </Text>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Text className={labelClass}>{t('deposit')}</Text>
        <Text className={valueClass}>
          {formatMoney(appointment?.consultationFee ?? 0, currency)}
        </Text>
      </div>

      {services.map((service) => {
        const serviceName = getLocalizedTextByLang(
          service.nameVi || service.name || '',
          service.nameKh || service.name || '',
          service.nameEn || service.name || '',
          lang,
        )
        return (
          <div
            key={service.id}
            className="mt-4 flex items-center justify-between gap-3"
          >
            <Text className={labelClass}>{serviceName}</Text>
            <Text className={valueClass}>
              {formatMoney(service.price ?? 0, currency)}
            </Text>
          </div>
        )
      })}

      <div className="my-3 h-px w-full bg-[#E2E8F0]" />

      <div className="flex items-center justify-between gap-3">
        <Text size="base_14" className="font-semibold text-[#0F172A]">
          {t('totalAmount')}
        </Text>
        <Text
          size="lg_16"
          className="font-semibold leading-[150%] text-[#E22A36]"
        >
          {formatMoney(totalAmount, currency)}
        </Text>
      </div>

      {paidAtLabel ? (
        <div className="mt-4 flex items-center justify-between gap-3">
          <Text className={labelClass}>{t('time')}</Text>
          <Text className={valueClass}>{paidAtLabel}</Text>
        </div>
      ) : null}

      <div className="mt-4 flex items-center justify-between gap-3">
        <Text className={labelClass}>{t('paymentMethod')}</Text>
        <div className="flex items-center gap-2.5">
          {methodMeta.logo ? (
            <Image
              src={methodMeta.logo}
              alt={methodMeta.label}
              className="size-5 shrink-0 rounded-full object-cover shadow-[0_0_12px_rgba(0,0,0,0.12)]"
            />
          ) : null}
          <Text className={valueClass}>{methodMeta.label}</Text>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <Text className={labelClass}>{t('status')}</Text>
        <span className="inline-flex shrink-0 items-center justify-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase leading-[15px] tracking-[0.5px] text-[#16A34A] bg-[#16A34A]/10">
          {t('paid')}
        </span>
      </div>
    </div>
  )
}
