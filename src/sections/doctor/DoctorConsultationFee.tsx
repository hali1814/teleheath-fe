import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { formatPrice } from '#/utils/price.util'

export default function DoctorConsultationFee() {
  return (
    <div className="w-full flex items-center gap-[16px] p-[16px] rounded-[12px] bg-white">
      <div className="w-[44px] h-[44px] rounded-[8px] bg-secondary/10 flex items-center justify-center">
        <Icon name="money" className="w-[16px] h-[16px] text-primary" />
      </div>
      <div className="flex flex-col gap-[4px]">
        <Text>Consultation Fee</Text>
        <div className="flex items-center">
          <Text
            size="lg_16"
            className="font-semibold leading-[1.2] text-primary"
          >
            {formatPrice(50)}
          </Text>
          <Text
            size="xs_10"
            className="font-medium leading-[15px] tracking-[0.5px] text-[#999999] uppercase"
          >
            / per visit
          </Text>
        </div>
      </div>
    </div>
  )
}
