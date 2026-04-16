import { useTranslation } from 'react-i18next'

export type HistoryAppointmentStatus =
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'NO_SHOW'
  | 'PENDING'
  | 'WAITING_CONFIRM'

const STATUS_BADGE_CLASS: Record<HistoryAppointmentStatus, string> = {
  CONFIRMED: 'bg-[#1D5EF2]/10 text-[#1D5EF2]',
  CANCELLED: 'bg-[#E22A36]/10 text-[#E22A36]',
  COMPLETED: 'bg-[#16A34A]/10 text-[#16A34A]',
  NO_SHOW: 'bg-[#64748B]/10 text-[#64748B]',
  PENDING: 'bg-[#64748B1A]/10 text-[#64748B]',
  WAITING_CONFIRM: 'bg-[#F0B133]/10 text-[#F0B133]',
}

export default function GetStatus({ status }: { status: string }) {
  const { t } = useTranslation(['appointment'])
  const statusLabel: Record<HistoryAppointmentStatus, string> = {
    CONFIRMED: t('confirmed'),
    CANCELLED: t('cancelled'),
    COMPLETED: t('completed'),
    NO_SHOW: t('noShow'),
    PENDING: t('pending'),
    WAITING_CONFIRM: t('waitingConfirm'),
  }
  //

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase leading-[15px] tracking-[0.5px] ${STATUS_BADGE_CLASS[status as HistoryAppointmentStatus]}`}
    >
      {statusLabel[status as HistoryAppointmentStatus]}
    </span>
  )
}
