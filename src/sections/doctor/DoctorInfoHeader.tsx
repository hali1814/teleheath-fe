import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import type { Doctor } from '#/entities/doctorEntity'
import { cn } from '#/lib/utils'
import { useTranslation } from 'react-i18next'

export default function DoctorInfoHeader({
  avatarUrl,
  name,
  specialties,
  experienceYears,
}: Pick<Doctor, 'avatarUrl' | 'name' | 'specialties' | 'experienceYears'>) {
  const { t } = useTranslation(['doctor', 'common'])

  return (
    <div className="flex flex-col items-center gap-[16px] p-[16px]">
      <Avatar className="w-[128px] h-[128px] border-[3px] border-dust-red-1">
        <AvatarImage src={avatarUrl} alt="doctor-information" />
        <AvatarFallback>
          <Text size="2xl_20" className="font-semibold leading-[1.2] uppercase">
            {name.slice(0, 2)}
          </Text>
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center gap-[8px]">
        <Text size="4xl_24" className="font-semibold leading-normal">
          {name}
        </Text>
        <div
          className={cn(
            'grid gap-[8px]',
            specialties?.length > 1 ? 'grid-cols-2' : 'grid-cols-1',
          )}
        >
          {specialties.map((specialty, index) => (
            <Text
              key={`${name}-spec-${index}`}
              size="lg_16"
              className="flex items-center gap-[8px] font-medium text-muted-foreground leading-normal"
            >
              <div className="size-[6px] rounded-full bg-muted-foreground" />{' '}
              {specialty}
            </Text>
          ))}
        </div>
        <Badge className="h-[30px] flex items-center gap-[8px] px-[12px] py-[4px] rounded-full bg-[#FFEAE8]">
          <Icon
            name="work_history_outline"
            className="w-[14px] h-[14px] text-primary"
          />
          <Text className="font-medium leading-normal text-primary">
            {t('experienceYears', { years: experienceYears })}
          </Text>
        </Badge>
      </div>
    </div>
  )
}
