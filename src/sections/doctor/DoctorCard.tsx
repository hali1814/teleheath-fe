import { cn } from '#/lib/utils'
import { Icon } from '#/components/icon'
import LocationBadge from '#/components/LocationBadge'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import type { AppLanguage } from '#/i18n'

export default function DoctorCard({
  className,
  doctorId,
  avatarUrl,
  nameVi,
  nameKh,
  nameEn,
  experienceYears,
  specialties,
  variant = 'vertical',
  hideBookAppointment = false,
  sizeAvatar = 'md',
}: {
  className?: string
  doctorId: string
  avatarUrl: string
  nameVi: string
  nameKh: string
  nameEn: string
  gender: string
  bioVi: string
  bioKh: string
  bioEn: string
  experienceYears: number
  consultationType: string
  consultationFee: number
  certifications: string
  specialties: {
    id: string
    name: string
    description: string
    iconUrl: string
  }[]
  variant?: 'vertical' | 'horizontal'
  hideBookAppointment?: boolean
  sizeAvatar?: 'sm' | 'md'
}) {
  const { t, i18n } = useTranslation(['common'])
  const avatarSize =
    sizeAvatar === 'sm' ? 'w-[63px] h-[63px]' : 'w-[86px] h-[86px]'
  if (variant === 'horizontal') {
    return (
      <Link
        to="/app/doctor/$id"
        params={{ id: doctorId }}
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
              {getLocalizedTextByLang(
                nameVi,
                nameKh,
                nameEn,
                i18n.language as AppLanguage,
              ).slice(0, 2)}
            </Text>
          </AvatarFallback>
        </Avatar>
        <div className="w-full flex flex-col items-start gap-[8px]">
          <Text size="base_14" className="font-semibold leading-[1.2]">
            {getLocalizedTextByLang(
              nameVi,
              nameKh,
              nameEn,
              i18n.language as AppLanguage,
            )}
          </Text>
          <Text
            size="sm_12"
            className="font-normal text-secondary leading-[1.3]"
          >
            {specialties?.length > 0 ? specialties[0]?.name : ''}
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
              {experienceYears} Years Experience • {'Vietnam'}
            </Text>
          </div>
          {!hideBookAppointment && (
            <Button className="w-full h-[32px] bg-dust-red-1" asChild>
              <Link
                to="/app/book-appointment/doctor/$doctorId"
                params={{ doctorId: doctorId }}
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
                  {t('actions.bookAppointment')}
                </Text>
              </Link>
            </Button>
          )}
        </div>
      </Link>
    )
  }

  return (
    <Link
      to="/app/doctor/$id"
      params={{ id: doctorId }}
      className={cn(
        'w-full flex flex-col items-center gap-[16px] shrink-0 rounded-[12px] border-none bg-white p-[16px]',
        className,
      )}
    >
      <Avatar className={cn(avatarSize, 'border border-dust-red-1')}>
        <AvatarImage src={avatarUrl} alt="doctor-card" />
        <AvatarFallback>
          <Text size="2xl_20" className="font-semibold leading-[1.2] uppercase">
            {getLocalizedTextByLang(
              nameVi,
              nameKh,
              nameEn,
              i18n.language as AppLanguage,
            ).slice(0, 2)}
          </Text>
        </AvatarFallback>
      </Avatar>
      <div className="w-full flex flex-col items-center gap-[8px]">
        <LocationBadge
          location={'Vietnam'}
          className="text-muted-foreground leading-[1.3]"
          textSize="xs_10"
        />
        <Text size="base_14" className="font-semibold leading-[1.2]">
          {getLocalizedTextByLang(
            nameVi,
            nameKh,
            nameEn,
            i18n.language as AppLanguage,
          )}
        </Text>
        <Text
          size="xs_10"
          className="font-medium text-muted-foreground leading-normal"
        >
          {specialties?.length > 0 ? specialties[0]?.name : ''}
        </Text>
        {!hideBookAppointment && (
          <Button className="w-full h-[32px] bg-dust-red-1" asChild>
            <Link
              to="/app/book-appointment/doctor/$doctorId"
              params={{ doctorId: doctorId }}
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
                {t('actions.bookAppointment')}
              </Text>
            </Link>
          </Button>
        )}
      </div>
    </Link>
  )
}
