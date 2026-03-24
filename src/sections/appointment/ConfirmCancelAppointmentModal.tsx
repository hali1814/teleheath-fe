import { useTranslation } from 'react-i18next'

import ConfirmModal from '#/components/ConfirmModal'

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
    <ConfirmModal
      open={open}
      onOpenChange={onOpenChange}
      title={t('cancelAppointmentTitle')}
      description={t('cancelAppointmentDescription')}
      cancelText={t('no')}
      confirmText={t('yes')}
      showCloseIcon={false}
      contentClassName="w-[90%] max-w-[440px] rounded-[16px] p-6"
      onConfirm={() => {
        onConfirm?.()
        onOpenChange(false)
      }}
    />
  )
}
