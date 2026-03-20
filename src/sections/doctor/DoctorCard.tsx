import { cn } from '#/lib/utils'
import { Icon } from '#/components/icon'
import LocationBadge from '#/components/LocationBadge'
import { Avatar, AvatarImage } from '#/components/ui/avatar'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'

export default function DoctorCard({
  className,
  avatar,
  name,
  location,
  specialization,
  experience,
  variant = 'vertical',
  hideBookAppointment = false,
  sizeAvatar = 'md',
}: {
  className?: string
  avatar: string
  name: string
  location: string
  specialization: string
  experience?: string
  variant?: 'vertical' | 'horizontal'
  hideBookAppointment?: boolean
  sizeAvatar?: 'sm' | 'md'
}) {
  const { t } = useTranslation(['common'])
  const avatarSize =
    sizeAvatar === 'sm' ? 'w-[63px] h-[63px]' : 'w-[86px] h-[86px]'
  if (variant === 'horizontal') {
    return (
      <Link
        to="/app/doctor/$id"
        params={{ id: '1' }}
        className={cn(
          'w-full flex flex-row items-center gap-[16px] shrink-0 rounded-[12px] border-none bg-white p-[16px]',
          className,
        )}
      >
        <Avatar className={cn(avatarSize, 'border border-dust-red-1')}>
          <AvatarImage src={avatar} alt="doctor-card" />
        </Avatar>
        <div className="w-full flex flex-col items-start gap-[8px]">
          <Text size="base_14" className="font-semibold leading-[1.2]">
            {name}
          </Text>
          <Text
            size="sm_12"
            className="font-normal text-secondary leading-[1.3]"
          >
            {specialization}
          </Text>
          <div className="flex items-center gap-[6px]">
            <Icon
              name="work_history_outline"
              className="w-[14px] h-[14px] text-muted-foreground"
            />
            <Text
              size="xs_10"
              className="font-normal text-muted-foreground leading-[1.3]"
            >
              {experience} • {location}
            </Text>
          </div>
          {!hideBookAppointment && (
            <Button className="w-full h-[32px] bg-dust-red-1">
              <Icon
                name="book_appointment"
                color="var(--primary)"
                className="w-[16px] h-[16px]"
              />
              <Text
                size="sm_12"
                className="font-medium leading-[1.3] text-primary"
              >
                {t('actions.bookAppointment')}
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
      params={{ id: '1' }}
      className={cn(
        'w-full flex flex-col items-center gap-[16px] shrink-0 rounded-[12px] border-none bg-white p-[16px]',
        className,
      )}
    >
      <Avatar className={cn(avatarSize, 'border border-dust-red-1')}>
        <AvatarImage src={avatar} alt="doctor-card" />
        {/* <AvatarFallback>
          <Icon name="call_doctor" className="w-[24px] h-[24px]" />
        </AvatarFallback> */}
      </Avatar>
      <div className="w-full flex flex-col items-center gap-[8px]">
        <LocationBadge
          location={location}
          className="text-muted-foreground leading-[1.3]"
          textSize="xs_10"
        />
        <Text size="base_14" className="font-semibold leading-[1.2]">
          {name}
        </Text>
        <Text
          size="xs_10"
          className="font-medium text-muted-foreground leading-normal"
        >
          {specialization}
        </Text>
        {!hideBookAppointment && (
          <Button className="w-full h-[32px] bg-dust-red-1">
            <Icon
              name="book_appointment"
              color="var(--primary)"
              className="w-[16px] h-[16px]"
            />
            <Text
              size="sm_12"
              className="font-medium leading-[1.3] text-primary"
            >
              {t('actions.bookAppointment')}
            </Text>
          </Button>
        )}
      </div>
    </Link>
  )
}
