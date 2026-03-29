import { Icon } from '#/components/icon'
import Text from '#/components/text'
import type { AppLanguage } from '#/i18n'
import type { Branch } from '#/types/hospital'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { useTranslation } from 'react-i18next'

export default function DoctorCurrentLocation({
  hospitalName,
  address,
  branches,
}: {
  hospitalName: string
  address: string
  branches: Branch[]
}) {
  const { t, i18n } = useTranslation(['doctor', 'common'])

  return (
    <div className="w-full flex flex-col gap-[16px]">
      <Text size="lg_16" className="font-semibold leading-[1.2]">
        {t('currentLocation')}
      </Text>
      {branches.length > 0 &&
        branches.map((branch) => (
          <div className="flex items-center justify-between gap-[10px] rounded-[12px] bg-white px-[16px] py-[20px] border border-[#F2F2F2]">
            <div className="flex-1 flex flex-col gap-[4px]">
              <Text>
                {getLocalizedTextByLang(
                  branch.nameVi,
                  branch.nameKh,
                  branch.nameEn,
                  i18n.language as AppLanguage,
                )}
              </Text>
              <div className="flex items-start gap-[8px]">
                <Icon
                  name="map_marker"
                  className="w-[16px] h-[16px] text-primary"
                />
                <Text
                  size="sm_12"
                  className="flex-1 font-normal leading-[1.3] text-muted-foreground"
                >
                  {address}
                </Text>
              </div>
            </div>
            <div className="w-[40px] h-[40px] rounded-full bg-dust-red-1 flex items-center justify-center">
              <Icon
                name="map_outline"
                className="w-[20px] h-[20px] text-primary"
              />
            </div>
          </div>
        ))}
    </div>
  )
}
