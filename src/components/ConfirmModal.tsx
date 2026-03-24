import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '#/components/ui/dialog'
import { cn } from '#/lib/utils'

interface ConfirmModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmText: string
  cancelText: string
  onConfirm?: () => void
  onCancel?: () => void
  confirmDisabled?: boolean
  showCloseIcon?: boolean
  contentClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  footerClassName?: string
  cancelButtonClassName?: string
  confirmButtonClassName?: string
}

export default function ConfirmModal({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  confirmDisabled = false,
  showCloseIcon = true,
  contentClassName,
  titleClassName,
  descriptionClassName,
  footerClassName,
  cancelButtonClassName,
  confirmButtonClassName,
}: ConfirmModalProps) {
  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  const handleConfirm = () => {
    onConfirm?.()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          'max-w-[361px] gap-5 rounded-[12px] border border-[#F2F2F2] bg-white px-5 py-6',
          contentClassName,
        )}
        aria-describedby={undefined}
      >
        <div>
          {showCloseIcon ? (
            <Button
              type="button"
              variant="ghost"
              className="absolute top-4 right-4 size-8 rounded-full p-0 text-[#B3B3B3] hover:bg-transparent hover:text-[#999999]"
              onClick={() => onOpenChange(false)}
            >
              <Icon name="close" />
            </Button>
          ) : null}
        </div>
        <div className="relative flex flex-col gap-4 px-0">
          <DialogTitle asChild>
            <Text
              size="lg_16"
              className={cn(
                'text-center font-semibold text-[#333333]',
                titleClassName,
              )}
            >
              {title}
            </Text>
          </DialogTitle>
          <Text
            size="base_14"
            className={cn(
              'text-center font-normal text-[#808080]',
              descriptionClassName,
            )}
          >
            {description}
          </Text>
        </div>

        <div
          className={cn('flex items-center gap-[10px] mt-2', footerClassName)}
        >
          <Button
            type="button"
            variant="ghost"
            className={cn(
              'h-[45px] flex-1 rounded-[40px] bg-[#F2F2F2] px-3 py-[12px] hover:bg-[#EAEAEA]',
              cancelButtonClassName,
            )}
            onClick={handleCancel}
          >
            <Text size="base_14" className="font-medium text-[#999999]">
              {cancelText}
            </Text>
          </Button>

          <Button
            type="button"
            variant="secondary"
            className={cn(
              'h-[45px] flex-1 rounded-[40px] bg-[#E22A36] px-3 py-[12px] hover:bg-[#E22A36]',
              confirmButtonClassName,
            )}
            onClick={handleConfirm}
            disabled={confirmDisabled}
          >
            <Text size="base_14" className="font-medium text-white">
              {confirmText}
            </Text>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
