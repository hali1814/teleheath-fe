import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { formatPrice } from '#/utils/price.util'
import { useTranslation } from 'react-i18next'

export default function DoctorConsultationFee({
  consultationFee,
}: {
  consultationFee: number
}) {
  const { t } = useTranslation(['doctor', 'common'])
  return (
    <div className="w-full flex items-center gap-[16px] p-[16px] rounded-[12px] bg-white">
      <div className="w-[44px] h-[44px] rounded-[8px] bg-secondary/10 flex items-center justify-center">
        <Icon name="money" className="w-[16px] h-[16px] text-primary" />
      </div>
      <div className="flex flex-col gap-[4px]">
        <Text>{t('consultationFee')}</Text>
        <div className="flex items-center">
          <Text
            size="lg_16"
            className="font-semibold leading-[1.2] text-primary"
          >
            {formatPrice(consultationFee)}
          </Text>
          <Text
            size="xs_10"
            className="font-medium leading-[15px] tracking-[0.5px] text-[#999999] uppercase"
          >
            / {t('perVisit')}
          </Text>
        </div>
      </div>
    </div>
  )
}
