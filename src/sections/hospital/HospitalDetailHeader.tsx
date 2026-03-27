import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import { Avatar, AvatarImage } from '#/components/ui/avatar'
import { getDomainWebsite } from '#/utils'

export default function HospitalDetailHeader({
  thumbnail,
  name,
  website,
}: {
  thumbnail: string
  name: string
  website: string
}) {
  return (
    <div className="relative w-full mb-[55px]">
      <Image
        src={thumbnail}
        alt="hospital-detail-header"
        className="w-full h-[192px]"
      />
      <div className="w-full px-[20px] absolute top-[140px] left-1/2 -translate-x-1/2">
        <div className="w-full flex items-center gap-[16px] p-[16px] rounded-[8px] bg-white shadow-[0px_1px_6px_rgba(0,0,0,0.05)]">
          <Avatar className="w-[63px] h-[63px] border border-dust-red-1 rounded-full">
            <AvatarImage src="/thumbnail.png" alt="hospital-logo" />
          </Avatar>
          <div className="flex flex-col gap-[12px]">
            <Text size="2xl_20" className="font-semibold leading-normal">
              {name}
            </Text>
            <div className="flex items-center gap-[6px]">
              <Icon name="plump_web" className="w-[16px] h-[16px]" />
              <Text className="text-muted-foreground leading-normal font-normal">
                {getDomainWebsite(website)}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
