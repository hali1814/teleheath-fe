import { Icon, type IconName } from '#/components/icon'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import ConfirmCancelAppointmentModal from './ConfirmCancelAppointmentModal'

export type AppointmentItemType =
  | 'video_cancel'
  | 'video_join_disabled'
  | 'video_join'
  | 'in_person_cancel'
  | 'in_person_directions_disabled'

export interface ItemAppointmentProps {
  type?: AppointmentItemType
  doctorName?: string
  timeLabel?: string
  dateLabel?: string
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  className?: string
}

function ActionButton({
  text,
  iconName,
  disabled = false,
  variant = 'primary',
  onClick,
}: {
  text: string
  iconName?: IconName
  disabled?: boolean
  variant?: 'primary' | 'light' | 'danger-outline'
  onClick?: () => void
}) {
  const baseClass =
    'h-[36px] flex-1 rounded-[8px] px-3 py-2 text-base font-medium leading-[20px]'

  if (variant === 'danger-outline') {
    return (
      <Button
        type="button"
        variant="ghost"
        disabled={disabled}
        onClick={onClick}
        className={`${baseClass} border border-[#FFCCC7] bg-white text-primary hover:bg-[#FFF7F6]`}
      >
        {text}
      </Button>
    )
  }

  if (variant === 'light') {
    return (
      <Button
        type="button"
        variant="ghost"
        onClick={onClick}
        className={`${baseClass} gap-2 bg-[#E6F0FF] text-[#1D5EF2] hover:bg-[#DDE9FF] disabled:bg-[#E6EEF9] disabled:text-[#1D5EF2]`}
      >
        {iconName ? <Icon name={iconName} className="size-4" /> : null}
        {text}
      </Button>
    )
  }

  return (
    <Button
      type="button"
      variant="secondary"
      disabled={disabled}
      onClick={onClick}
      className={`${baseClass} gap-2 ${disabled ? 'bg-[#D9D9D9] text-white' : 'bg-primary text-white '}`}
    >
      {iconName ? <Icon name={iconName} className="size-4" /> : null}
      {text}
    </Button>
  )
}

export default function ItemAppointment({
  type = 'video_cancel',
  doctorName = 'Dr. Nguyen Duc Anh',
  timeLabel = '07:00 - 07:30 AM',
  dateLabel = 'Thu, 25 Nov',
  onPrimaryClick,
  onSecondaryClick,
  className,
}: ItemAppointmentProps) {
  const { t } = useTranslation(['appointment'])
  const [openCancelModal, setOpenCancelModal] = useState(false)

  const isVideo = type.startsWith('video')
  const showDate = !isVideo
  const canCancel = type === 'video_cancel' || type === 'in_person_cancel'

  return (
    <div
      className={`w-full rounded-[12px] bg-white p-4 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] ${className ?? ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex size-[65px] items-center justify-center rounded-[60px] bg-[#53B6B5]">
          <Icon name="user_doctor_solid" className="size-10 text-white" />
        </div>

        <div className="min-w-0 flex-1 gap-1 flex flex-col">
          <Text
            size="sm_12"
            className={`font-medium uppercase tracking-[0.03em] ${isVideo ? 'text-secondary' : 'text-[#1D5EF2]'}`}
          >
            {isVideo ? t('videoConsultation') : t('inPersonVisit')}
          </Text>
          <Text size="base_14" className="mt-1 font-semibold text-text-primary">
            {doctorName}
          </Text>
          <Text size="sm_12" className="mt-1 font-normal text-[#64748B]">
            {showDate ? `${dateLabel} • ${timeLabel}` : timeLabel}
          </Text>
        </div>

        <div
          className={`flex absolute right-4 top-4 size-8 items-center justify-center rounded-[8px] p-2 ${isVideo ? 'bg-[#FFF1F0]' : 'bg-[#E6F0FF]'}`}
        >
          <Icon
            name={isVideo ? 'record' : 'location_blue'}
            className="size-4"
            color={isVideo ? '#E22A36' : '#1D5EF2'}
          />
        </div>
      </div>

      <div className="mt-3 flex gap-3">
        {type === 'video_cancel' ? (
          <ActionButton
            text={t('cancelAppointment')}
            variant="danger-outline"
            onClick={() => setOpenCancelModal(true)}
          />
        ) : null}

        {type === 'video_join_disabled' ? (
          <ActionButton
            text={t('joinCall')}
            iconName="call_doctor"
            disabled
            onClick={onPrimaryClick}
          />
        ) : null}

        {type === 'video_join' ? (
          <ActionButton
            text={t('joinCall')}
            iconName="add_record"
            onClick={onPrimaryClick}
          />
        ) : null}

        {type === 'in_person_cancel' ? (
          <>
            <ActionButton
              text={t('getDirections')}
              iconName="map_blue"
              variant="light"
              onClick={onPrimaryClick}
            />
            <ActionButton
              text={t('cancelAppointment')}
              variant="danger-outline"
              onClick={() => setOpenCancelModal(true)}
            />
          </>
        ) : null}

        {type === 'in_person_directions_disabled' ? (
          <ActionButton
            text={t('getDirections')}
            iconName="map_blue"
            variant="light"
            disabled
            onClick={onPrimaryClick}
          />
        ) : null}
      </div>

      {canCancel ? (
        <ConfirmCancelAppointmentModal
          open={openCancelModal}
          onOpenChange={setOpenCancelModal}
          onConfirm={() => {
            if (type === 'video_cancel') {
              onPrimaryClick?.()
              return
            }
            onSecondaryClick?.()
          }}
        />
      ) : null}
    </div>
  )
}
