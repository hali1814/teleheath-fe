import { Icon, type IconName } from '#/components/icon'
import Text from '#/components/text'
import { Avatar, AvatarImage } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import { Checkbox } from '#/components/ui/checkbox'
import icon from '#/const/icon'
import { cn } from '#/lib/utils'
import { consultationTypes } from '#/mockData'
import { formatPrice } from '#/utils/price.util'
import { useState } from 'react'

const serviceIcons = ['car_check', 'supporter']

const ServiceItem = ({
  icon,
  title,
  selected,
  onClick,
}: {
  icon: IconName
  title: string
  selected: boolean
  onClick: () => void
}) => {
  return (
    <div className="flex items-center gap-[16px]">
      <div
        className={cn(
          'w-[40px] h-[40px] flex items-center justify-center rounded-full',
          selected ? 'bg-[#D331311A]' : 'bg-[#F2F2F2]',
        )}
      >
        <Icon
          name={icon}
          className={cn(
            'w-[20px] h-[20px] text-primary',
            selected ? 'text-primary' : 'text-[#999999]',
          )}
        />
      </div>
      <Text className="flex-1 leading-normal text-muted-foreground">
        {title}
      </Text>
      <Checkbox
        className="w-[20px] h-[20px] text-white border-secondary/20"
        checked={selected}
        onClick={onClick}
      />
    </div>
  )
}

const PaymentMethodItem = ({
  logo,
  title,
  selected,
  onClick,
}: {
  logo: string
  title: string
  selected: boolean
  onClick: () => void
}) => {
  const borderColor = selected ? 'border-primary' : 'border-dust-red-1'

  return (
    <div
      className={cn(
        'flex items-center gap-[16px] px-[16px] py-[12px] rounded-[12px] bg-white border border-transparent',
        borderColor,
      )}
      onClick={onClick}
    >
      <Avatar>
        <AvatarImage src={logo} className="w-[32px] h-[32px]" />
      </Avatar>
      <Text className="flex-1 font-medium leading-normal text-[#333333]">
        {title}
      </Text>
      {selected ? (
        <Icon
          name="check_circle_solid"
          className="w-[20px] h-[20px] text-primary"
        />
      ) : (
        <div className="w-[20px] h-[20px] rounded-full border border-[#D3313133]" />
      )}
    </div>
  )
}

export function ReviewStep() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center px-[30px] py-[16px] rounded-[48px] bg-[#ED26300D] border-2 border-[#ED263033]">
        <div className="flex-1 flex flex-col gap-[6px]">
          <Text size="sm_12" color="secondary" className="leading-[1.3]">
            BOOK BY HOSPITAL
          </Text>
          <Text className="leading-[1.2] font-semibold text-[#333333]">
            Tam Anh Hospital
          </Text>
        </div>
        {serviceIcons.map((icon, index) => (
          <span
            key={icon}
            className={cn(
              'w-[28px] h-[28px] rounded-full bg-[#D33131] text-white border-2 border-white/30 flex items-center justify-center',
              {
                '-ml-2': index > 0,
              },
            )}
          >
            <Icon
              name={icon as IconName}
              color="white"
              className="w-[10px] h-[10px]"
            />
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-[16px] p-[20px] rounded-[16px] bg-white">
        <div className="flex-col gap-[4px]">
          <Text size="lg_16" className="leading-[1.2] font-semibold">
            Services
          </Text>
          <Text size="sm_12" className="leading-[1.3] text-muted-foreground">
            Choose the additional service you want to purchase.
          </Text>
        </div>
        {serviceIcons.map((icon) => (
          <ServiceItem
            key={icon}
            icon={icon as IconName}
            title={icon}
            selected={selectedServices.includes(icon)}
            onClick={() => {
              if (selectedServices.includes(icon)) {
                setSelectedServices(selectedServices.filter((s) => s !== icon))
              } else {
                setSelectedServices([...selectedServices, icon])
              }
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-[16px] p-[16px] rounded-[16px] bg-white">
        <Text size="lg_16" className="leading-[1.2] font-semibold">
          Appointment Information
        </Text>
        <div className="flex items-start gap-[16px]">
          <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ED2630]/10">
            <Icon name="hospital" className="w-[20px] h-[20px] text-primary" />
          </div>
          <div className="flex-1 flex flex-col gap-[6px]">
            <Text
              size="base_14"
              className="leading-normal text-muted-foreground"
            >
              Hospital & Branch
            </Text>
            <Text
              size="lg_16"
              className="leading-[1.2] font-semibold text-[#333333]"
            >
              Tam Anh Hospital
            </Text>
            <Text className="leading-normal text-[#333333]">Ho Chi Minh</Text>
          </div>
        </div>
        <div className="flex items-start gap-[16px]">
          <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ED2630]/10">
            <Icon
              name="map_marker_outline"
              className="w-[20px] h-[20px] text-primary"
            />
          </div>
          <div className="flex-1 flex flex-col gap-[6px]">
            <Text
              size="base_14"
              className="leading-normal text-muted-foreground"
            >
              Address
            </Text>
            <Text
              size="lg_16"
              className="leading-[1.2] font-semibold text-[#333333]"
            >
              2B Pho Quang Street, Ward 2, Tan Binh District, Ho Chi Minh City
            </Text>
          </div>
        </div>
        <div className="flex items-start gap-[16px]">
          <div className="w-[40px] h-[40px] flex items-center justify-center rounded-full bg-[#ED2630]/10">
            <Icon
              name="user_outline"
              className="w-[20px] h-[20px] text-primary"
            />
          </div>
          <div className="flex-1 flex flex-col gap-[6px]">
            <Text
              size="base_14"
              className="leading-normal text-muted-foreground"
            >
              Patient
            </Text>
            <Text
              size="lg_16"
              className="leading-[1.2] font-semibold text-[#333333]"
            >
              Sokra Chum
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-[16px]">
          <div className="flex-1 flex flex-col gap-[4px] p-[12px] rounded-[8px] bg-dust-red-1 border border-dust-red-2">
            <Text
              size="xs_10"
              className="font-bold leading-[15px] text-dust-red-4 uppercase"
            >
              Date
            </Text>
            <Text className="leading-normal font-medium text-[#333333]">
              Nov 16, 2025
            </Text>
          </div>
          <div className="flex-1 flex flex-col gap-[4px] p-[12px] rounded-[8px] bg-dust-red-1 border border-dust-red-2">
            <Text
              size="xs_10"
              className="font-bold leading-[15px] text-dust-red-4 uppercase"
            >
              Time
            </Text>
            <Text className="leading-normal font-medium text-[#333333]">
              06:30 - 07:00 AM
            </Text>
          </div>
        </div>

        <div className="flex items-center gap-[12px] bg-[#F8FAFC] p-[12px] rounded-[8px]">
          <Icon
            name="medical_services"
            className="w-[20px] h-[20px] text-primary"
          />
          <Text className="flex-1 leading-normal font-medium">
            Specialty: Cardiology
          </Text>
        </div>
      </div>

      <div
        className={cn(
          'flex flex-col gap-[16px] p-[16px] rounded-[12px] bg-white border border-transparent',
        )}
      >
        <div className="flex justify-between items-center">
          <Text size="lg_16" className="font-semibold leading-[1.2]">
            Service Package
          </Text>
          <Badge className="bg-[#FEF3C7]">
            <Text
              size="sm_12"
              className="text-[#B45309] leading-[1.3] font-semibold"
            >
              VIP
            </Text>
          </Badge>
        </div>
        <div className="flex-1 flex flex-col gap-[12px]">
          <Text
            size="lg_16"
            className="font-semibold leading-[1.2] text-secondary"
          >
            {consultationTypes[1].title}
          </Text>
          {consultationTypes[1].benefits.map((benefit) => (
            <div key={benefit} className="flex items-start gap-[8px]">
              <div className="w-[16px] h-[16px] flex items-center justify-center rounded-full bg-primary/10">
                <Icon name="check" className="w-[6px] h-[4px] text-primary" />
              </div>
              <Text
                size="sm_12"
                className="flex-1 text-muted-foreground leading-[1.3]"
              >
                {benefit}
              </Text>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[16px] p-[20px] rounded-[16px] bg-white">
        <Text size="lg_16" className="font-semibold leading-[1.2]">
          Text Details
        </Text>
        <div className="flex items-center justify-between">
          <Text className="leading-normal text-muted-foreground">
            Consultation Fee
          </Text>
          <Text className="leading-normal font-medium text-[#333333]">
            {formatPrice(50)}
          </Text>
        </div>
        <div className="flex items-center justify-between">
          <Text className="leading-normal text-muted-foreground">
            Service Fee
          </Text>
          <Text className="leading-normal font-medium text-[#333333]">
            {formatPrice(30)}
          </Text>
        </div>
        <div className="flex items-center justify-between border-t border-[#E2E8F0] pt-[16px]">
          <Text
            size="lg_16"
            className="font-semibold leading-[1.2] text-[#333333]"
          >
            Total Amount
          </Text>
          <Text
            size="xl_18"
            className="leading-normal font-medium text-primary"
          >
            {formatPrice(80)}
          </Text>
        </div>
      </div>

      <div className="flex flex-col gap-[16px] p-[16px] rounded-[12px] bg-white">
        <Text size="lg_16" className="font-semibold leading-[1.2]">
          Payment Methods
        </Text>
        <PaymentMethodItem
          logo="/doctor.png"
          title="KHQR"
          selected={true}
          onClick={() => {}}
        />
      </div>
    </div>
  )
}
