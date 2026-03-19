import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import ExpandViewButton from '../common/ExpandViewButton'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface Branch {
  name: string
  address: string
  phone: string
  email: string
  working_hours: {
    mon_sat: string
    sun: string
    emergency: string
  }
}

const BranchCard = ({ name, address, phone, email, working_hours }: Branch) => {
  const { t } = useTranslation(['hospital', 'common'])

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
            {t('operatingHours.map')}
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
          className="w-[16px] h-[16px] text-dust-red-8"
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
          <Text className="font-medium leading-normal">
            {t('operatingHours.title')}
          </Text>
        </div>
        <div className="flex justify-between items-center">
          <Text
            size="sm_12"
            className="font-normal leading-[1.3] text-muted-foreground"
          >
            {t('operatingHours.mon_sat')}
          </Text>
          <Text size="sm_12" className="font-medium leading-[1.3]">
            {working_hours.mon_sat}
          </Text>
        </div>
        <div className="flex justify-between items-center">
          <Text
            size="sm_12"
            className="font-normal leading-[1.3] text-muted-foreground"
          >
            {t('operatingHours.sun')}
          </Text>
          <Text
            size="sm_12"
            className="font-medium leading-[1.3] uppercase text-dust-red-8"
          >
            {working_hours.sun}
          </Text>
        </div>
        <div className="flex justify-between items-center">
          <Text
            size="sm_12"
            className="font-normal leading-[1.3] text-muted-foreground"
          >
            {t('operatingHours.emergency')}
          </Text>
          <Text size="sm_12" className="font-medium leading-[1.3]">
            {working_hours.emergency}
          </Text>
        </div>
      </div>
    </div>
  )
}

const LIMIT_BRANCH = 3

export default function BranchList({ branches }: { branches: Branch[] }) {
  const [expanded, setExpanded] = useState(false)
  const limitBranch = expanded ? branches.length : LIMIT_BRANCH
  const { t } = useTranslation(['hospital', 'common'])

  return (
    <div className="flex flex-col gap-[16px] py-[12px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('ourBranches')}
      </Text>
      <div className="flex flex-col gap-[16px]">
        {branches.slice(0, limitBranch).map((branch, index) => (
          <BranchCard
            key={index}
            name={branch.name}
            address={branch.address}
            phone={branch.phone}
            email={branch.email}
            working_hours={branch.working_hours}
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
          {t('common:actions.bookAppointment')}
        </Text>
      </Button>
    </div>
  )
}
