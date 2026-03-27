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
import type { Service } from '#/types/hospital'
import { formatPrice } from '#/utils/price.util'
import Text from '#/components/text'
import { Icon } from '#/components/icon'

export type ModalDetailServiceProps = {
  service?: Service
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectService?: () => void
  className?: string
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-[6px]">
      <div className="w-[16px] h-[16px] flex items-center justify-center rounded-full bg-dust-red-1">
        <Icon name="check" className="w-[6px] h-[6px] text-primary" />
      </div>
      <div className="flex flex-col gap-[10px]">{children}</div>
    </div>
  )
}

export function ModalDetailService({
  service,
  open,
  onOpenChange,
  onSelectService,
  className,
}: ModalDetailServiceProps) {
  const safeDescriptionHtml = useMemo(
    () => sanitizeTipTapHtml(service?.description),
    [service?.description],
  )

  if (!service) {
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
              {service.name}
            </Text>
            <Icon
              name="close"
              className="w-[14px] h-[14px] text-[#B3B3B3]"
              onClick={() => onOpenChange(false)}
            />
          </div>
          <div className="flex flex-col gap-[16px]">
            <SectionHeading>
              <Text className="font-semibold leading-[1.2] text-[#333333]">
                Service Description
              </Text>
              <Text
                size="sm_12"
                className="leading-[1.8] text-muted-foreground"
              >
                {safeDescriptionHtml ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: safeDescriptionHtml }}
                  />
                ) : (
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    No description available.
                  </p>
                )}
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
                {formatPrice(service.price)}
              </Text>
            </SectionHeading>
          </div>
        </div>

        <div className="flex gap-3 bg-white px-[20px] pt-[8px] pb-[24px]">
          <button
            type="button"
            className="flex-1 rounded-[40px] bg-[#F2F2F2] py-[12px]"
            onClick={() => onOpenChange(false)}
          >
            <Text className="leading-normal font-medium text-[#999999]">
              Close
            </Text>
          </button>
          <button
            className="flex-1 rounded-[40px] bg-primary py-[12px]"
            onClick={() => {
              onSelectService?.()
              onOpenChange(false)
            }}
          >
            <Text className="leading-normal font-medium text-white">
              Select Service
            </Text>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
