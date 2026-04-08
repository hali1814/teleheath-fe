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
  const safeDescriptionHtml = useMemo(
    () => sanitizeTipTapHtml(serviceType?.description),
    [serviceType?.description],
  )

  if (!serviceType) {
    return null
  }

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

        <div className="flex max-h-[min(60vh,520px)] flex-col gap-[32px] overflow-y-auto px-[20px] py-[24px]">
          <div className="flex items-center justify-between">
            <Text size="lg_16" className="leading-[1.2] font-semibold">
              View Details
            </Text>
            <Icon
              name="close"
              className="w-[14px] h-[14px] text-[#B3B3B3]"
              onClick={() => onOpenChange(false)}
            />
          </div>
          <div className="flex flex-col gap-[16px]">
            <Text
              size="lg_16"
              className="flex-1 text-center leading-[1.2] font-extrabold text-muted-foreground"
            >
              {serviceType.partnerName}
            </Text>

            <SectionHeading>
              <Text className="font-semibold leading-[1.2] text-[#333333]">
                Address
              </Text>
              <Text
                size="sm_12"
                className="leading-[1.8] text-muted-foreground"
              >
                {serviceType.partner.address}
              </Text>
            </SectionHeading>

            <SectionHeading>
              <Text className="font-semibold leading-[1.2] text-[#333333]">
                Pricing
              </Text>
              <Text
                size="lg_16"
                className="leading-[1.2] font-semibold text-primary"
              >
                {formatPrice(serviceType.price)}
              </Text>
            </SectionHeading>

            {serviceType.amenities.length > 0 && (
              <SectionHeading>
                <Text className="font-semibold leading-[1.2] text-[#333333]">
                  Amenities in the car
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
