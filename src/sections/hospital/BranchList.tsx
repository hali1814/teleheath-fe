import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import ExpandViewButton from '../common/ExpandViewButton'
import { useState } from 'react'

const BranchCard = ({
  name,
  address,
  phone,
  email,
}: {
  name: string
  address: string
  phone: string
  email: string
}) => {
  return (
    <div className="flex flex-col gap-[16px] px-[16px] py-[20px] rounded-[12px] bg-white">
      <div className="flex items-center justify-between">
        <Text className="font-medium leading-normal">{name}</Text>
        <div className="flex items-center gap-[4px]">
          <Icon
            name="map_outline"
            className="w-[16px] h-[16px] text-dust-red-8"
          />
          <Text
            size="sm_12"
            className="font-medium leading-[1.3] text-dust-red-8"
          >
            Map
          </Text>
        </div>
      </div>
      <div className="flex items-center gap-[8px]">
        <Icon
          name="call_outline"
          className="w-[16px] h-[16px] text-dust-red-8"
        />
        <Text
          size="sm_12"
          className="font-normal leading-[1.3] text-muted-foreground"
        >
          {phone}
        </Text>
      </div>
      <div className="flex items-center gap-[8px]">
        <Icon name="mail" className="w-[16px] h-[16px] text-dust-red-8" />
        <Text
          size="sm_12"
          className="font-normal leading-[1.3] text-muted-foreground"
        >
          {email}
        </Text>
      </div>
      <div className="flex items-center gap-[8px]">
        <Icon
          name="map_marker_outline"
          className="w-[24px] h-[16px] text-dust-red-8"
        />
        <Text
          size="sm_12"
          className="font-normal leading-[1.3] text-muted-foreground"
        >
          {address}
        </Text>
      </div>
      <div className="flex flex-col gap-[10px] bg-background p-[12px] rounded-[8px]">
        <div className="flex items-center gap-[8px]">
          <Icon
            name="clock_outline"
            className="w-[16px] h-[16px] text-dust-red-8"
          />
          <Text className="font-medium leading-normal">Operating Hours</Text>
        </div>
        <div className="flex justify-between items-center">
          <Text
            size="sm_12"
            className="font-normal leading-[1.3] text-muted-foreground"
          >
            Monday - Friday
          </Text>
          <Text size="sm_12" className="font-medium leading-[1.3]">
            8:00 - 17:00
          </Text>
        </div>
        <div className="flex justify-between items-center">
          <Text
            size="sm_12"
            className="font-normal leading-[1.3] text-muted-foreground"
          >
            Sun
          </Text>
          <Text
            size="sm_12"
            className="font-medium leading-[1.3] uppercase text-dust-red-8"
          >
            Closed
          </Text>
        </div>
        <div className="flex justify-between items-center">
          <Text
            size="sm_12"
            className="font-normal leading-[1.3] text-muted-foreground"
          >
            Emergency
          </Text>
          <Text size="sm_12" className="font-medium leading-[1.3]">
            24/7
          </Text>
        </div>
      </div>
    </div>
  )
}

const LIMIT_BRANCH = 3

export default function BranchList() {
  const [expanded, setExpanded] = useState(false)
  const limitBranch = expanded ? 6 : LIMIT_BRANCH

  return (
    <div className="flex flex-col gap-[16px] py-[12px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        Our Branches
      </Text>
      <div className="flex flex-col gap-[16px]">
        {Array.from({ length: limitBranch }).map((_, index) => (
          <BranchCard
            key={index}
            name={`Tam Anh Hospital, Ho Chi Minh City`}
            address={`2B Pho Quang Street, Ward 2, Tan Binh District, Ho Chi Minh City, Vietnam`}
            phone={`0287 102 6789 - 093 180 6858`}
            email={`cskh@tahospital.vn`}
          />
        ))}
        {!expanded && (
          <ExpandViewButton
            className="w-full flex justify-center"
            expanded={expanded}
            onClick={() => setExpanded(!expanded)}
          />
        )}
      </div>
      <Button className="w-full h-[45px] bg-primary rounded-[40px] gap-[10px]">
        <Icon
          name="book_appointment"
          color="white"
          className="w-[20px] h-[20px]"
        />
        <Text className="font-medium leading-normal text-white">
          Book Appointment
        </Text>
      </Button>
    </div>
  )
}
