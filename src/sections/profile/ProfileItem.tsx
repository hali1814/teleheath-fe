import Text from '#/components/text'
import { useRouter } from '@tanstack/react-router'
import Avatar from './Avatar'

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
  id?: number
}

export default function ProfileItem({
  avatarSrc,
  name = 'Sokra Chum',
  relationshipLabel = 'SELF',
  dateOfBirth,
  phone,
  patientIdLabel = 'PATIENT ID: #TEL-98765',
  className,
  id,
}: ProfileItemProps) {
  const router = useRouter()
  return (
    <div
      className={['w-full rounded-xl bg-white p-4', className ?? ''].join(' ')}
      style={{ boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}
      onClick={() => {
        router.navigate({
          to: '/app/profile/edit',
          search: { idMember: id, isUserProfile: false },
        })
      }}
    >
      <div className="flex gap-[16px]">
        <div className="shrink-0">
          <Avatar
            src={avatarSrc}
            alt={name}
            size={95}
            hideCamera
            initials={name?.slice(0, 2)}
            textSize="6xl_32"
          />
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
            <Text size="sm_12" className="mt-1 text-[#64748B] font-normal">
              {phone}
            </Text>
          ) : null}

          <div className="mt-1 inline-flex w-fit items-center justify-center rounded-full border border-[#FFCCC7] bg-[#FFF1F0] px-[12px] py-[4px]">
            <Text
              size="xs_10"
              className="font-medium text-[#D43129] leading-none"
            >
              {patientIdLabel}
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}
