import { Icon } from '#/components/icon'
import Text from '#/components/text'
import type { AppLanguage } from '#/i18n'
import { cn } from '#/lib/utils'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { useTranslation } from 'react-i18next'

export function LocationCard({
  className,
  branchId,
  nameVi,
  nameKh,
  nameEn,
  address,
  selected = false,
  onClick,
}: {
  className?: string
  branchId: string
  nameVi: string
  nameKh: string
  nameEn: string
  address: string
  selected?: boolean
  onClick?: () => void
}) {
  const { i18n } = useTranslation()
  const borderColor = selected ? 'border-primary' : 'border-dust-red-1'

  return (
    <div
      className={cn(
        'flex gap-[12px] px-[16px] py-[20px] rounded-[12px] bg-white border border-transparent',
        borderColor,
      )}
      onClick={onClick}
    >
      <div className="flex-1 flex flex-col gap-[12px]">
        <Text className="font-medium leading-normal text-[#333333]">
          {getLocalizedTextByLang(
            nameVi,
            nameKh,
            nameEn,
            i18n.language as AppLanguage,
          )}
        </Text>
        <div className="flex items-start gap-[8px]">
          <Icon name="map_marker" className="w-[16px] h-[16px] text-icon" />
          <Text
            size="sm_12"
            className="font-normal leading-[1.3] text-muted-foreground"
          >
            {address}
          </Text>
        </div>
      </div>
      {selected ? (
        <Icon
          name="check_circle_solid"
          className="w-[20px] h-[20px] text-primary"
        />
      ) : (
        <div className="w-[20px] h-[20px] rounded-full border border-[#D3313133]" />
      )}
    </div>
  )
}
