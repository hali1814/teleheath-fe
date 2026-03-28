import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import { Avatar, AvatarImage } from '#/components/ui/avatar'
import type i18n from '#/i18n'
import type { AppLanguage } from '#/i18n'
import { getDomainWebsite } from '#/utils'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { useTranslation } from 'react-i18next'

export default function HospitalDetailHeader({
  nameVi,
  nameKh,
  nameEn,
  website,
  thumbnailUrl,
  logoUrl,
}: {
  nameVi: string
  nameKh: string
  nameEn: string
  website: string
  thumbnailUrl: string
  logoUrl: string
}) {
  const { i18n } = useTranslation()

  return (
    <div className="relative w-full mb-[55px]">
      <Image
        src={thumbnailUrl}
        alt="hospital-detail-header"
        className="w-full h-[192px]"
      />
      <div className="w-full px-[20px] absolute top-[140px] left-1/2 -translate-x-1/2">
        <div className="w-full flex items-center gap-[16px] p-[16px] rounded-[8px] bg-white shadow-[0px_1px_6px_rgba(0,0,0,0.05)]">
          <Avatar className="w-[63px] h-[63px] border border-dust-red-1 rounded-full">
            <AvatarImage src={logoUrl} alt="hospital-logo" />
          </Avatar>
          <div className="flex flex-col gap-[12px]">
            <Text size="2xl_20" className="font-semibold leading-normal">
              {getLocalizedTextByLang(
                nameVi,
                nameKh,
                nameEn,
                i18n.language as AppLanguage,
              )}
            </Text>
            <div className="flex items-center gap-[6px]">
              <Icon name="plump_web" className="w-[16px] h-[16px]" />
              <Text className="text-muted-foreground leading-normal font-normal">
                {getDomainWebsite(website)}
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
