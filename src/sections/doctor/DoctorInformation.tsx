import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Avatar, AvatarImage } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { formatPrice } from '#/utils/price.util'
import AboutDoctor from './AboutDoctor'

export default function DoctorInformation() {
  return (
    <div className="flex flex-col items-center gap-[16px]">
      <div className="flex flex-col items-center gap-[16px] p-[16px]">
        <Avatar className="w-[128px] h-[128px] border-[3px] border-dust-red-1">
          <AvatarImage src="/doctor.png" alt="doctor-information" />
        </Avatar>
        <div className="flex flex-col items-center gap-[8px]">
          <Text size="4xl_24" className="font-semibold leading-normal">
            Dr. Nguyen Duc Anh
          </Text>
          <Text
            size="lg_16"
            className="font-medium text-primary leading-normal"
          >
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
      <AboutDoctor />
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
                2B Pho Quang Street, Ward 2, Tan Binh District, Ho Chi Minh
                City, Vietnam
              </Text>
            </div>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-dust-red-1 flex items-center justify-center">
            <Icon
              name="map_outline"
              className="w-[20px] h-[20px] text-primary"
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-[16px] py-[16px]">
        <Text size="lg_16" className="font-semibold leading-[1.2]">
          Education & Certifications
        </Text>
        <div className="flex flex-col gap-[12px]">
          <div className="flex items-start gap-[12px]">
            <Icon
              name="graduate_cap"
              className="w-[20px] h-[20px] text-primary"
            />
            <div className="flex flex-col gap-[8px]">
              <Text className="font-semibold leading-[1.2]">
                Doctor of Medicine (MD)
              </Text>
              <Text
                size="sm_12"
                className="font-normal leading-[1.3] text-muted-foreground"
              >
                Ho Chi Minh City University of Medicine and Pharmacy
              </Text>
            </div>
          </div>
          <div className="flex items-start gap-[12px]">
            <Icon
              name="seal_check"
              className="w-[20px] h-[20px] text-primary"
            />
            <div className="flex flex-col gap-[8px]">
              <Text className="font-semibold leading-[1.2]">
                Specialist Level I in Obstetrics and Gynecology
              </Text>
              <Text
                size="sm_12"
                className="font-normal leading-[1.3] text-muted-foreground"
              >
                Pham Ngoc Thach University of Medicine
              </Text>
            </div>
          </div>
          <div className="flex items-start gap-[12px]">
            <Icon name="license" className="w-[20px] h-[20px] text-primary" />
            <div className="flex flex-col gap-[8px]">
              <Text className="font-semibold leading-[1.2]">
                Medical Practice License
              </Text>
              <Text
                size="sm_12"
                className="font-normal leading-[1.3] text-muted-foreground"
              >
                Issued by Ho Chi Minh City Department of Health
              </Text>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-[15px] pt-[10px] pb-[35px] ">
        <Button className="w-full h-[45px] bg-secondary/10 gap-[10px] rounded-[40px]">
          <Icon name="call_doctor" className="w-[20px] h-[20px] text-primary" />
          <Text className="font-medium leading-normal text-primary">
            Online consultation
          </Text>
        </Button>
        <Button className="w-full h-[45px] bg-primary gap-[10px] rounded-[40px]">
          <Icon
            name="book_appointment"
            className="w-[20px] h-[20px] text-white"
          />
          <Text className="font-medium leading-normal text-white">
            Booking Offline
          </Text>
        </Button>
      </div>
    </div>
  )
}
