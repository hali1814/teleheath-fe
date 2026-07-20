import type { ReactNode } from 'react'
import { useMemo } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { cn } from '#/lib/utils'
import { sanitizeTipTapHtml } from '#/utils/sanitize-tiptap-html'
import type { ServiceType } from '#/types/service'
import { formatPrice } from '#/utils/price.util'
import Text from '#/components/text'
import { Icon } from '#/components/icon'
import { useTranslation } from 'react-i18next'

export type ModalDetailServiceTypeProps = {
  serviceType?: ServiceType
  open: boolean
  onOpenChange: (open: boolean) => void
  className?: string
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-[6px]">
      <div className="w-[16px] h-[16px] flex items-center justify-center rounded-full bg-dust-red-1">
        <Icon name="check" className="w-[6px] h-[6px] text-primary" />
      </div>
      <div className="flex-1 flex flex-col gap-[10px]">{children}</div>
    </div>
  )
}

export function ModalDetailServiceType({
  serviceType,
  open,
  onOpenChange,
  className,
}: ModalDetailServiceTypeProps) {
  const { t } = useTranslation(['appointment', 'common', 'profile'])
  const safeDescriptionHtml = useMemo(
    () => sanitizeTipTapHtml(serviceType?.description),
    [serviceType?.description],
  )

  if (!serviceType) {
    return null
  }

  const hasActiveDiscount =
    serviceType.promotionPrice != null &&
    serviceType.originalPrice > serviceType.promotionPrice

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          'w-full gap-0 overflow-hidden p-0 rounded-[12px] bg-white',
          className,
        )}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
        </DialogHeader>

        <div className="flex max-h-[90vh] flex-col overflow-y-auto px-[20px] py-[24px]">
          <div className="flex items-center justify-between">
            {/* BA: title lấy TÊN SERVICE (addonServiceName, vd "Pick-up & Transport"),
                không phải typeName (hay bị = tên hãng xe / tên hotel trong data). */}
            <Text
              size="lg_16"
              className="leading-[1.2] font-semibold text-[#0F172A]"
            >
              {serviceType.addonServiceName}
            </Text>
            <Icon
              name="close"
              className="w-[14px] h-[14px] text-[#B3B3B3]"
              onClick={() => onOpenChange(false)}
            />
          </div>
          <div className="mt-[16px] border-t border-[#D0D0D0]" />
          <div className="mt-[32px] flex flex-col gap-[16px]">
            <Text
              size="lg_16"
              className="leading-[1.2] font-extrabold text-[#64748B]"
            >
              {serviceType.partnerName}
            </Text>

            <SectionHeading>
              <Text className="font-semibold leading-[1.2] text-[#333333]">
                {t('appointment:address')}
              </Text>
              <div className="flex gap-[8px]">
                <span className="leading-[1.8] text-[#64748B]">•</span>
                <Text
                  size="sm_12"
                  className="flex-1 leading-[1.8] text-[#64748B]"
                >
                  {serviceType.partner.address}
                </Text>
              </div>
            </SectionHeading>

            <SectionHeading>
              <Text className="font-semibold leading-[1.2] text-[#333333]">
                {t('common:price')}
              </Text>
              {hasActiveDiscount ? (
                <div className="flex items-center gap-[8px]">
                  <Text
                    size="lg_16"
                    className="font-semibold leading-[1.2] text-primary"
                  >
                    {formatPrice(serviceType.promotionPrice)}
                  </Text>
                  <Text className="leading-normal text-muted-foreground line-through">
                    {formatPrice(serviceType.originalPrice)}
                  </Text>
                </div>
              ) : (
                <Text
                  size="lg_16"
                  className="font-semibold leading-[1.2] text-primary"
                >
                  {formatPrice(serviceType.price)}
                </Text>
              )}
            </SectionHeading>

            {serviceType.amenities?.length > 0 && (
              <SectionHeading>
                <Text className="font-semibold leading-[1.2] text-[#333333]">
                  {t('common:amenitiesInCar', 'Tiện nghi')}
                </Text>
                <div className="flex flex-col gap-[8px]">
                  {serviceType.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-[8px]">
                      {amenity.iconUrl && <img src={amenity.iconUrl} alt={amenity.name} className="w-[16px] h-[16px] object-cover" />}
                      <Text size="sm_12" className="leading-[1.8] text-muted-foreground">
                        {amenity.name}
                      </Text>
                    </div>
                  ))}
                </div>
              </SectionHeading>
            )}

            {safeDescriptionHtml && (
              <SectionHeading>
                <Text className="font-semibold leading-[1.2] text-[#333333]">
                  {t('common:description', 'Chi tiết dịch vụ')}
                </Text>
                <div
                  className="prose prose-sm max-w-none [&_img]:my-[16px] [&_img]:rounded-[6px]"
                  dangerouslySetInnerHTML={{ __html: safeDescriptionHtml }}
                />
              </SectionHeading>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
