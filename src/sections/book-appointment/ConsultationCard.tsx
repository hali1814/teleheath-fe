import { Icon } from '#/components/icon'
import Text from '#/components/text'
import type { AppLanguage } from '#/i18n'
import { cn } from '#/lib/utils'
import { getLocalizedTextByLang } from '#/utils/localized-text.util'
import { useTranslation } from 'react-i18next'

export function ConsultationCard({
  className,
  code,
  nameEn,
  nameVi,
  features,
  description,
  surchargeAmount,
  selected = false,
  onClick,
}: {
  className?: string
  code: string
  nameEn: string
  nameVi: string
  features: string[]
  description: string
  surchargeAmount: number
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
            '',
            nameEn,
            i18n.language as AppLanguage,
          )}
        </Text>
        {features.length > 0 &&
          features.map((feature, index) => (
            <div key={index} className="flex items-start gap-[8px]">
              <div className="w-[16px] h-[16px] flex items-center justify-center rounded-full bg-primary/10">
                <Icon name="check" className="w-[6px] h-[4px] text-primary" />
              </div>
              <Text
                size="sm_12"
                className="flex-1 text-muted-foreground leading-[1.3]"
              >
                {feature}
              </Text>
            </div>
          ))}
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
