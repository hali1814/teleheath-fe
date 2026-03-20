import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import Image from '#/components/image'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Dialog, DialogContent, DialogTitle } from '#/components/ui/dialog'

export interface DetailProfileModalProfile {
  avatarSrc?: string
  name: string
  relationshipLabel: string
  genderLabel?: string
  dateOfBirth?: string // expected DD-MM-YYYY or YYYY-MM-DD
  phone?: string
  patientIdLabel: string
  address?: string
}

export interface DetailProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  profile: DetailProfileModalProfile
  onEdit?: () => void
}

function getAgeText(dateOfBirth?: string) {
  if (!dateOfBirth) return undefined
  const parsed = dayjs(dateOfBirth, ['DD-MM-YYYY', 'YYYY-MM-DD'], true)
  const fallbackParsed = parsed.isValid() ? parsed : dayjs(dateOfBirth)
  if (!fallbackParsed.isValid()) return undefined
  const age = dayjs().diff(fallbackParsed, 'year')
  return `${age} years old`
}

export default function DetailProfileModal({
  open,
  onOpenChange,
  profile,
  onEdit,
}: DetailProfileModalProps) {
  const { t } = useTranslation(['profile', 'common'])
  const ageText = getAgeText(profile.dateOfBirth)
  const genderText =
    profile.genderLabel ?? t('profile:genderMale', { defaultValue: 'Male' })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[360px] p-4 bg-white"
        aria-describedby={undefined}
      >
        <DialogTitle className="font-semibold text-text-primary text-lg">
          {t('profileInformation')}
        </DialogTitle>

        <div className="mt-4 flex flex-col items-center text-center">
          <div className="size-[90px] overflow-hidden rounded-full bg-[#E5E5E5]">
            {profile.avatarSrc ? (
              <Image
                src={profile.avatarSrc}
                alt={profile.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="size-full" />
            )}
          </div>

          <div className="mt-2 flex items-center gap-3">
            <Text size="2xl_20" className="font-semibold text-text-primary">
              {profile.name}
            </Text>
          </div>

          {ageText ? (
            <Text size="base_14" className="text-[#64748B] font-normal mt-1">
              {ageText} • {genderText}
            </Text>
          ) : null}

          <div className="mt-1 inline-flex w-fit items-center justify-center rounded-full border border-[#FFCCC7] bg-[#FFF1F0] px-[12px] py-[4px]">
            <Text
              size="xs_10"
              className="font-medium text-[#D43129] leading-none"
            >
              {profile.patientIdLabel}
            </Text>
          </div>
        </div>

        <div className="mt-1 rounded-xl border border-[#F1F5F9] bg-white p-3 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]">
          <Text size="lg_16" className="font-semibold text-text-primary">
            {t('profile:personalInformation')}
          </Text>

          <div className="mt-1 divide-y divide-[#F2F2F2]">
            <div className="flex items-center justify-between py-3">
              <Text size="base_14" className="font-normal text-text-secondary">
                {t('profile:dateOfBirth')}
              </Text>
              <Text size="base_14" className="font-normal text-[#333333]">
                {profile.dateOfBirth ?? '--'}
              </Text>
            </div>

            <div className="flex items-center justify-between py-3">
              <Text size="base_14" className="font-normal text-text-secondary">
                {t('profile:phoneNumber')}
              </Text>
              <Text size="base_14" className="font-normal text-[#333333]">
                {profile.phone ?? '--'}
              </Text>
            </div>

            <div className="flex items-start gap-4 py-3">
              <Text
                size="base_14"
                className="shrink-0 font-normal text-text-secondary min-w-[90px]"
              >
                {t('profile:address')}
              </Text>
              <Text
                size="base_14"
                className="flex-1 wrap-break-word font-normal text-[#333333] text-right"
              >
                No. 123, Preah Monivong Blvd, Phnom Penh, Cambodia
              </Text>
            </div>
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Button
            type="button"
            variant="ghost"
            className="h-[45px] flex-1 rounded-[40px] bg-[#F2F2F2] hover:bg-[#EDEDED] shadow-none"
            onClick={() => onOpenChange(false)}
          >
            <Text size="base_14" className="font-medium text-[#999999]">
              {t('common:actions.cancel')}
            </Text>
          </Button>

          <Button
            type="button"
            variant="secondary"
            className="h-[45px] flex-1 rounded-[40px]"
            onClick={() => {
              onEdit?.()
              onOpenChange(false)
            }}
          >
            <Text size="base_14" className="font-medium text-white">
              {t('profile:editProfile')}
            </Text>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
