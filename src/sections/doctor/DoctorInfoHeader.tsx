import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Avatar, AvatarImage } from '#/components/ui/avatar'
import { Badge } from '#/components/ui/badge'
import type { AppLanguage } from '#/i18n'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { useTranslation } from 'react-i18next'

export default function DoctorInfoHeader({
  avatarUrl,
  nameVi,
  nameKh,
  nameEn,
  specialties,
  experienceYears,
}: {
  avatarUrl: string
  nameVi: string
  nameKh: string
  nameEn: string
  specialties: {
    id: string
    name: string
    description: string
    iconUrl: string
  }[]
  experienceYears: number
}) {
  const { t, i18n } = useTranslation(['doctor', 'common'])

  return (
    <div className="flex flex-col items-center gap-[16px] p-[16px]">
      <Avatar className="w-[128px] h-[128px] border-[3px] border-dust-red-1">
        <AvatarImage src={avatarUrl} alt="doctor-information" />
      </Avatar>
      <div className="flex flex-col items-center gap-[8px]">
        <Text size="4xl_24" className="font-semibold leading-normal">
          {getLocalizedTextByLang(nameVi, nameKh, nameEn, i18n.language as AppLanguage)}
        </Text>
        <Text size="lg_16" className="font-medium text-primary leading-normal">
          {specialties[0].name}
        </Text>
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
