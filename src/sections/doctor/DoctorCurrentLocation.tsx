import { Icon } from '#/components/icon'
import Text from '#/components/text'

export default function DoctorCurrentLocation() {
  return (
    <div className="flex flex-col gap-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        Current Location
      </Text>
      <div className="flex items-center justify-between gap-[10px] rounded-[12px] bg-white px-[16px] py-[20px] border border-[#F2F2F2]">
        <div className="flex-1 flex flex-col gap-[4px]">
          <Text>Tam Anh Hospital, Ho Chi Minh City</Text>
          <div className="flex items-start gap-[8px]">
            <Icon
              name="map_marker"
              className="w-[28px] h-[16px] text-dust-red-8"
            />
            <Text
              size="sm_12"
              className="font-normal leading-[1.3] text-muted-foreground"
            >
              2B Pho Quang Street, Ward 2, Tan Binh District, Ho Chi Minh City,
              Vietnam
            </Text>
          </div>
        </div>
        <div className="w-[40px] h-[40px] rounded-full bg-dust-red-1 flex items-center justify-center">
          <Icon name="map_outline" className="w-[20px] h-[20px] text-primary" />
        </div>
      </div>
    </div>
  )
}
