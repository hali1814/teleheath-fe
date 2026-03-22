import { Icon } from '#/components/icon'
import Text from '#/components/text'
import { useTranslation } from 'react-i18next'

export type HistoryVisitType = 'video' | 'in_person'

export type HistoryEntityKind = 'doctor' | 'hospital'

export type HistoryAppointmentStatus =
  | 'confirmed'
  | 'cancelled'
  | 'completed'
  | 'no_show'

export interface ItemHistoryAppointmentProps {
  visitType: HistoryVisitType
  entityKind: HistoryEntityKind
  /** Doctor or hospital display name */
  name: string
  /** Full line e.g. "Wed, 16 Nov • 06:30 - 07:00 AM" */
  scheduleLabel: string
  status: HistoryAppointmentStatus
  /** Optional avatar background (doctor rows) */
  avatarClassName?: string
  className?: string
  onClick?: () => void
}

const STATUS_BADGE_CLASS: Record<HistoryAppointmentStatus, string> = {
  confirmed: 'bg-[#1D5EF2]/10 text-[#1D5EF2]',
  cancelled: 'bg-[#E22A36]/10 text-[#E22A36]',
  completed: 'bg-[#16A34A]/10 text-[#16A34A]',
  no_show: 'bg-[#F0B133]/10 text-[#F0B133]',
}

export default function ItemHistoryAppointment({
  visitType,
  entityKind,
  name,
  scheduleLabel,
  status,
  avatarClassName,
  className,
  onClick,
}: ItemHistoryAppointmentProps) {
  const { t } = useTranslation(['appointment'])

  const statusLabel: Record<HistoryAppointmentStatus, string> = {
    confirmed: t('confirmed'),
    cancelled: t('cancelled'),
    completed: t('completed'),
    no_show: t('noShow'),
  }

  const isVideo = visitType === 'video'

  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`w-full rounded-[12px] bg-white p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ${className ?? ''}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (!onClick) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onClick()
        }
      }}
    >
      <div className="flex gap-3">
        <div
          className={`flex size-[65px] shrink-0 items-center justify-center rounded-[60px] border border-[#FFF1F0] ${
            entityKind === 'doctor'
              ? avatarClassName ?? 'bg-[#53B6B5]'
              : 'bg-[#E2E8F0]'
          }`}
        >
          {entityKind === 'doctor' ? (
            <Icon name="user_doctor_solid" className="size-10 text-white" />
          ) : (
            <Icon name="hospital" className="size-10 text-[#64748B]" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <Text
              size="sm_12"
              className={`shrink font-medium uppercase tracking-[0.03em] ${
                isVideo ? 'text-secondary' : 'text-[#1D5EF2]'
              }`}
            >
              {isVideo ? t('videoConsultation') : t('inPersonVisit')}
            </Text>
            <span
              className={`inline-flex shrink-0 items-center justify-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase leading-[15px] tracking-[0.5px] ${STATUS_BADGE_CLASS[status]}`}
            >
              {statusLabel[status]}
            </span>
          </div>

          <Text size="base_14" className="mt-1 font-semibold text-text-primary">
            {name}
          </Text>

          <Text size="sm_12" className="mt-1 font-normal leading-[130%] text-[#64748B]">
            {scheduleLabel}
          </Text>
        </div>
      </div>
    </div>
  )
}
