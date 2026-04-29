import { Icon } from '#/components/icon'
import Text from '#/components/text'
import type { AppLanguage } from '#/i18n'
import { cn } from '#/lib/utils'
import type { Hospital } from '#/entities/hospitalEntity'
import { getGoogleMapsHref } from '#/utils/google-maps.util'
import { isClosedLabel } from '#/utils/working-hours.util'
import ExpandViewButton from '../common/ExpandViewButton'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

type Branch = Hospital['branches'][number]

const BranchCard = ({
  id,
  name,
  address,
  phone,
  email,
  operatingHours,
  googleMaps,
  emergency24h,
}: Branch) => {
  const { t, i18n } = useTranslation(['hospital', 'common'])

  return (
    <div className="flex flex-col gap-[16px] px-[16px] py-[20px] rounded-[12px] bg-white">
      <div className="flex items-center justify-between">
        <Text className="font-medium leading-normal">{name}</Text>
        <button
          type="button"
          className="flex items-center gap-[4px]"
          onClick={() => {
            const href = getGoogleMapsHref(googleMaps, address)
            if (!href) return

            window.open(href, '_blank', 'noopener,noreferrer')
          }}
        >
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
        </button>
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
        {Object.entries(operatingHours).map(([label, value], index) => (
          <div key={index} className="flex justify-between items-center">
            <Text
              size="sm_12"
              className="font-normal leading-[1.3] text-muted-foreground"
            >
              {label}
            </Text>
            <Text
              size="sm_12"
              className={cn(
                'font-medium leading-[1.3]',
                isClosedLabel(value, i18n.language as AppLanguage) &&
                  'text-dust-red-8',
              )}
            >
              {value}
            </Text>
          </div>
        ))}
        {emergency24h && (
          <div className="flex justify-between items-center">
            <Text
              size="sm_12"
              className="font-normal leading-[1.3] text-muted-foreground"
            >
              {t('operatingHours.emergency')}
            </Text>
            <Text size="sm_12" className="font-medium leading-[1.3]">
              24/7
            </Text>
          </div>
        )}
      </div>
    </div>
  )
}

const LIMIT_BRANCH = 3

export default function BranchList({ branches }: { branches: Branch[] }) {
  const [expanded, setExpanded] = useState(false)
  const { t } = useTranslation(['hospital', 'common'])

  const limitBranch = expanded ? branches.length : LIMIT_BRANCH

  return (
    <>
      {branches.length > 0 && (
        <div className="flex flex-col gap-[16px] py-[12px]">
          <Text size="lg_16" className="font-semibold leading-[1.2]">
            {t('ourBranches')}
          </Text>
          <div className="flex flex-col gap-[16px]">
            {branches.slice(0, limitBranch).map((branch, index) => (
              <BranchCard
                key={index}
                id={branch.id}
                name={branch.name}
                address={branch.address}
                phone={branch.phone}
                email={branch.email}
                operatingHours={branch.operatingHours}
                googleMaps={branch.googleMaps}
                emergency24h={branch.emergency24h}
              />
            ))}
            {branches.length > LIMIT_BRANCH && (
              <ExpandViewButton
                className="w-full flex justify-center"
                expanded={expanded}
                onClick={() => setExpanded(!expanded)}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
