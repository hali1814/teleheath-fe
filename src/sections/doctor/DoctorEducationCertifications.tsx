import { Icon } from '#/components/icon'
import Text from '#/components/text'

export default function DoctorEducationCertifications() {
  return (
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
          <Icon name="seal_check" className="w-[20px] h-[20px] text-primary" />
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
  )
}
