import { cn } from '#/lib/utils'
import { Icon } from '#/components/icon'
import LocationBadge from '#/components/LocationBadge'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from '@tanstack/react-router'
import { useProfileStore } from '#/stores/profile'
import { goBackToAppMobile } from '#/utils/auth'
import type { Doctor } from '#/entities/doctorEntity'

type DoctorCardProps = {
  className?: string
  variant?: 'vertical' | 'horizontal'
  hideBookAppointment?: boolean
  sizeAvatar?: string
  truncateName?: boolean
} & Doctor

export default function DoctorCard({
  className,
  variant = 'vertical',
  hideBookAppointment = false,
  sizeAvatar,
  truncateName = false,
  ...doctor
}: DoctorCardProps) {
  const { t } = useTranslation(['doctor', 'common'])
  const profile = useProfileStore((s) => s.profile)
  const navigate = useNavigate()
  const {
    doctorId,
    avatarUrl,
    name,
    experienceYears,
    specialties,
    countryName,
  } = doctor
  const avatarSize = sizeAvatar
    ? sizeAvatar
    : variant === 'vertical'
      ? 'w-[86px] h-[86px]'
      : 'w-[103px] h-[103px]'

  if (variant === 'horizontal') {
    return (
      <Link
        to="/app/doctor/$id"
        params={{ id: doctorId.toString() }}
        className={cn(
          'w-full flex flex-row items-center gap-[16px] shrink-0 rounded-[12px] border-none bg-white p-[16px]',
          className,
        )}
      >
        <Avatar className={cn(avatarSize, 'border border-dust-red-1')}>
          <AvatarImage src={avatarUrl} alt="doctor-card" />
          <AvatarFallback>
            <Text
              size="2xl_20"
              className="font-semibold leading-[1.2] uppercase"
            >
              {name.slice(0, 2)}
            </Text>
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1 flex flex-col items-start gap-[8px]">
          <Text
            size="base_14"
            className={cn(
              'font-semibold leading-[1.2]',
              truncateName && 'w-full min-w-0 truncate',
            )}
          >
            {name}
          </Text>
          {specialties?.length > 0 &&
            specialties.map((specialty, index) => (
              <Text
                key={`${doctorId}-spec-h-${index}`}
                size="sm_12"
                className="flex items-center gap-[8px] font-normal text-muted-foreground leading-[1.3]"
              >
                <div className="size-[4px] rounded-full bg-muted-foreground" />
                {specialty}
              </Text>
            ))}
          <div className="flex items-center gap-[6px]">
            <Icon
              name="work_history_outline"
              className="w-[14px] h-[14px] text-muted-foreground"
            />
            <Text
              size="xs_10"
              className="font-normal text-muted-foreground leading-[1.3]"
            >
              {t('experienceYears', { years: experienceYears })} • {countryName}
            </Text>
          </div>
          {!hideBookAppointment && (
            <Button
              className="w-full h-[32px] bg-dust-red-1"
              onClick={(e) => {
                e.preventDefault()
                if (!profile?.id) {
                  goBackToAppMobile()
                  return
                }
                navigate({
                  to: '/app/book-appointment/doctor/$doctorId',
                  params: { doctorId: doctorId.toString() },
                })
              }}
            >
              <Icon
                name="book_appointment"
                color="var(--primary)"
                className="w-[16px] h-[16px]"
              />
              <Text
                size="sm_12"
                className="font-medium leading-[1.3] text-primary"
              >
                {t('common:actions.bookAppointment')}
              </Text>
            </Button>
          )}
        </div>
      </Link>
    )
  }

  return (
    <Link
      to="/app/doctor/$id"
      params={{ id: doctorId.toString() }}
      className={cn(
        'w-full flex flex-col items-center gap-[16px] shrink-0 rounded-[12px] border-none bg-white p-[16px]',
        className,
      )}
    >
      <Avatar className={cn(avatarSize, 'border border-dust-red-1')}>
        <AvatarImage src={avatarUrl} alt="doctor-card" />
        <AvatarFallback>
          <Text size="2xl_20" className="font-semibold leading-[1.2] uppercase">
            {name.slice(0, 2)}
          </Text>
        </AvatarFallback>
      </Avatar>
      <div className="w-full flex flex-col items-center gap-[8px]">
        <LocationBadge
          location={countryName}
          className="text-muted-foreground leading-[1.3]"
          textSize="xs_10"
        />
        {truncateName ? (
          <div className="w-full min-w-0 self-stretch text-center">
            <Text
              size="base_14"
              className="w-full min-w-0 truncate text-center font-semibold leading-[1.2]"
            >
              {name}
            </Text>
          </div>
        ) : (
          <Text
            size="base_14"
            className="text-center font-semibold leading-[1.2]"
          >
            {name}
          </Text>
        )}
        {specialties?.length > 0 &&
          specialties.map((specialty, index) => (
            <Text
              key={`${doctorId}-spec-v-${index}`}
              size="xs_10"
              className="flex items-center gap-[8px] font-medium text-muted-foreground leading-normal"
            >
              <div className="size-[4px] rounded-full bg-muted-foreground" />
              {specialty}
            </Text>
          ))}
        {!hideBookAppointment && (
          <Button
            className="w-full h-[32px] bg-dust-red-1"
            onClick={(e) => {
              e.preventDefault()
              if (!profile?.id) {
                goBackToAppMobile()
                return
              }
              navigate({
                to: '/app/book-appointment/doctor/$doctorId',
                params: { doctorId: doctorId.toString() },
              })
            }}
          >
            <Icon
              name="book_appointment"
              color="var(--primary)"
              className="w-[16px] h-[16px]"
            />
            <Text
              size="sm_12"
              className="font-medium leading-[1.3] text-primary"
            >
              {t('common:actions.bookAppointment')}
            </Text>
          </Button>
        )}
      </div>
    </Link>
  )
}
