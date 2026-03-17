import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Avatar, AvatarImage } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'

export default function DoctorInfoHeader() {
  return (
    <div className="flex flex-col items-center gap-[16px] p-[16px]">
      <Avatar className="w-[128px] h-[128px] border-[3px] border-dust-red-1">
        <AvatarImage src="/doctor.png" alt="doctor-information" />
      </Avatar>
      <div className="flex flex-col items-center gap-[8px]">
        <Text size="4xl_24" className="font-semibold leading-normal">
          Dr. Nguyen Duc Anh
        </Text>
        <Text size="lg_16" className="font-medium text-primary leading-normal">
          Obstetrics and Gynecology
        </Text>
        <Badge className="h-[30px] flex items-center gap-[8px] px-[12px] py-[4px] rounded-full bg-[#FFEAE8]">
          <Icon
            name="work_history_outline"
            className="w-[14px] h-[14px] text-primary"
          />
          <Text className="font-medium leading-normal text-primary">
            12 Years Experience
          </Text>
        </Badge>
      </div>
    </div>
  )
}
