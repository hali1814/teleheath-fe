import { Button } from '#/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import { useTranslation } from 'react-i18next'

function PaymentFailedGraphic() {
  return (
    <div
      className="relative mx-auto mb-1 flex h-[100px] w-full max-w-[220px] items-center justify-center"
      aria-hidden
    >
      <span className="absolute left-[6%] top-0 text-xl font-light text-red-200">
        ×
      </span>
      <span className="absolute right-[8%] top-3 text-sm text-red-200">×</span>
      <span className="absolute bottom-2 left-[18%] text-lg text-red-200">
        ×
      </span>
      <span className="absolute bottom-4 right-[14%] text-xs text-red-200">
        ×
      </span>
      <span className="absolute left-[28%] top-6 text-[10px] text-red-100">
        ×
      </span>
      <svg
        className="relative z-10 h-[76px] w-[76px] shrink-0 text-[#E22A36]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.002 4.5-2.599 4.5H4.645c-1.597 0-3.753-2.5-2.599-4.5L9.401 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}

interface PaymentFailedDialogProps {
  open: boolean
  onClose: () => void
}

export function PaymentFailedDialog({ open, onClose }: PaymentFailedDialogProps) {
  const { t } = useTranslation(['payment'])

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        showCloseButton={false}
        className="gap-0 overflow-hidden rounded-[12px] p-0 sm:max-w-[min(calc(100%-2rem),361px)]"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="relative">
          <div className="flex flex-col items-center px-5 pb-2 pt-6 text-center">
            <PaymentFailedGraphic />
            <DialogHeader className="w-full space-y-0 text-center">
              <DialogTitle className="text-lg font-semibold leading-snug tracking-tight text-[#000000]">
                {t('paymentFailedTitle')}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="mt-3 max-w-[300px] px-0.5 text-center text-sm leading-relaxed text-[#64748B] whitespace-pre-line">
              {t('paymentFailedDescription')}
            </DialogDescription>
          </div>

          <div className="px-5 pb-6 pt-5">
            <Button
              type="button"
              variant="ghost"
              className="h-[45px] w-full rounded-full bg-[#F2F2F2] text-base font-medium text-[#999999] hover:bg-[#E5E5E5]"
              onClick={onClose}
            >
              {t('paymentFailedClose')}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
