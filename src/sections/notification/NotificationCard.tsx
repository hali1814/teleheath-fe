import { Icon } from '#/components/icon'
import Text from '#/components/text'

export default function NotificationCard() {
  return (
    <div className="w-full flex gap-3 p-[16px] bg-[#FFF4F4] border border-secondary/5">
      <div className="flex items-center justify-center w-12 h-12">
        <div className="flex items-center justify-center w-[36px] h-[36px] bg-[#34D36C]/10 rotate-45 rounded-[8px]">
          <Icon
            name="notification"
            className="w-[20px] h-[20px] text-[#34D36C] -rotate-45"
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="flex flex-col gap-1">
          <Text className="font-medium leading-normal text-[#34D36C]">
            Appointment Completed
          </Text>

          <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
            Your appointment on [Date] at [Hospital/Doctor] is complete. Thank
            you for using Telehealth.
          </Text>
        </div>
      </div>

      <Text size="xs_10" className="font-medium leading-[1.3] text-[#34D36C]">
        1m ago
      </Text>
    </div>
  )
}
