import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'

import { useTranslation } from 'react-i18next'

import Text from '#/components/text'
import Image from '#/components/image'
import { Button } from '#/components/ui/button'
import DetailProfileModal, {
  type DetailProfileModalProfile,
} from '#/sections/profile/DetailProfileModal'

export type RelationshipLabel = 'SELF' | 'SIBLING' | string

export interface ProfileItemProps {
  avatarSrc?: string
  name?: string
  relationshipLabel?: RelationshipLabel
  dateOfBirth?: string
  phone?: string
  genderLabel?: string
  address?: string
  patientIdLabel?: string // e.g. "PATIENT ID: #TEL-98765"
  onViewDetails?: () => void
  onEdit?: () => void
  className?: string
}

const FALLBACK_AVATAR_STYLE: CSSProperties = {
  backgroundColor: '#E5E5E5',
}

export default function ProfileItem({
  avatarSrc,
  name = 'Sokra Chum',
  relationshipLabel = 'SELF',
  dateOfBirth,
  phone,
  genderLabel = 'Male',
  address,
  patientIdLabel = 'PATIENT ID: #TEL-98765',
  onViewDetails,
  onEdit,
  className,
}: ProfileItemProps) {
  const { t } = useTranslation('profile')

  const [open, setOpen] = useState(false)

  const modalProfile: DetailProfileModalProfile = useMemo(
    () => ({
      avatarSrc,
      name,
      relationshipLabel,
      genderLabel,
      dateOfBirth,
      phone,
      patientIdLabel,
      address,
    }),
    [
      address,
      avatarSrc,
      dateOfBirth,
      genderLabel,
      name,
      patientIdLabel,
      phone,
      relationshipLabel,
    ],
  )

  return (
    <>
      <div
        className={[
          'w-full rounded-xl bg-white p-4',
          'shadow-[0px_1px_2px_rgba(0,0,0,0.05)]',
          className ?? '',
        ].join(' ')}
      >
      <div className="flex gap-[16px]">
        <div className="shrink-0">
          {avatarSrc ? (
            <div className="size-[95px] overflow-hidden rounded-full">
              <Image
                src={avatarSrc}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
          ) : (
            <div
              className="size-[95px] rounded-full"
              style={FALLBACK_AVATAR_STYLE}
            />
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-[10px]">
            <Text size="base_14" className="font-semibold text-text-primary">
              {name}
            </Text>
            <span className="inline-flex items-center justify-center rounded-full bg-[#D331311A] px-[8px] py-[2px]">
              <Text size="xs_10" className="font-bold uppercase text-[#A8071A]">
                {relationshipLabel}
              </Text>
            </span>
          </div>

          {dateOfBirth ? (
            <Text size="sm_12" className="mt-1 text-text-secondary font-normal">
              {dateOfBirth}
            </Text>
          ) : null}

          {phone ? (
            <Text size="sm_12" className="mt-1 text-text-primary font-normal">
              {phone}
            </Text>
          ) : null}

          <div className="mt-3 inline-flex w-fit items-center justify-center rounded-full border border-[#FFCCC7] bg-[#FFF1F0] px-[12px] py-[4px]">
            <Text
              size="xs_10"
              className="font-medium text-[#D43129] leading-none"
            >
              {patientIdLabel}
            </Text>
          </div>
        </div>
      </div>
      <div className="mt-6 flex gap-[16px]">
        <Button
          type="button"
          variant="ghost"
          className="h-[36px] flex-1 rounded-[8px] bg-[#F1F5F9]"
          onClick={() => {
            setOpen(true)
            onViewDetails?.()
          }}
        >
          <Text size="base_14" className="font-medium text-text-primary">
            {t('viewDetails')}
          </Text>
        </Button>

        <Button
          type="button"
          variant="secondary"
          className="h-[36px] flex-1 rounded-[8px]"
          onClick={onEdit}
        >
          <Text size="base_14" className="font-medium text-white">
            {t('edit')}
          </Text>
        </Button>
      </div>
      </div>

      <DetailProfileModal
        open={open}
        onOpenChange={setOpen}
        profile={modalProfile}
        onEdit={onEdit}
      />
    </>
  )
}
