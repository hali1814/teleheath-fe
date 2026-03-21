import { useTranslation } from 'react-i18next'

import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '#/components/ui/dialog'

interface ConfirmCancelAppointmentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm?: () => void
}

export default function ConfirmCancelAppointmentModal({
  open,
  onOpenChange,
  onConfirm,
}: ConfirmCancelAppointmentModalProps) {
  const { t } = useTranslation(['appointment'])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[90%] max-w-[440px] rounded-[16px] p-6"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">{t('cancelAppointmentTitle')}</DialogTitle>

        <div className="text-center">
          <Text size="lg_16" className="font-semibold text-[#333333]">
            {t('cancelAppointmentTitle')}
          </Text>

          <Text
            size="base_14"
            className="mx-auto mt-4 max-w-[321px] text-center font-normal leading-[21px] text-[#808080]"
          >
            {t('cancelAppointmentDescription')}
          </Text>
        </div>

        <div className="mt-6 flex gap-[12px]">
          <Button
            type="button"
            variant="ghost"
            className="h-[45px] flex-1 rounded-[40px] bg-[#F2F2F2] text-[#999999] hover:bg-[#EAEAEA]"
            onClick={() => onOpenChange(false)}
          >
            <Text size="base_14" className="font-medium text-[#999999]">
              {t('no')}
            </Text>
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="h-[45px] flex-1 rounded-[40px]"
            onClick={() => {
              onConfirm?.()
              onOpenChange(false)
            }}
          >
            <Text size="base_14" className="font-medium text-white">
              {t('yes')}
            </Text>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
