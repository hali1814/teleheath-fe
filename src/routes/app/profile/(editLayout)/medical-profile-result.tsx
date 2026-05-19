import Text from '#/components/text'
import { Icon } from '#/components/icon'
import LoadingBlocking from '#/components/LoadingBlocking'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '#/components/ui/collapsible'
import { Header } from '#/sections/home'
import Avatar from '#/sections/profile/Avatar'
import ItemHistoryAppointment from '#/sections/history/ItemHistoryAppointment'
import {
  useSearchMedicalProfileQuery,
  type SearchMedicalProfilePatient,
} from '#/services/query/profile/searchMedicalProfile'
import {
  getAppointmentMonthLabels,
  groupAppointmentsByMonth,
} from '#/utils/history'
import { DATE_TIME_TYPE, formatDate } from '#/utils/date.util'
import { concatAddress } from '#/utils'
import { cn } from '#/lib/utils'
import { createFileRoute } from '@tanstack/react-router'
import dayjs from 'dayjs'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'

const searchParamsSchema = z.object({
  patientId: z.string(),
})

export const Route = createFileRoute(
  '/app/profile/(editLayout)/medical-profile-result',
)({
  validateSearch: (search) => searchParamsSchema.parse(search),
  component: RouteComponent,
})

function RouteComponent() {
  const { t, i18n } = useTranslation(['profile', 'appointment'])
  const [expanded, setExpanded] = useState(false)
  const { patientId } = Route.useSearch()

  const { data: response, isLoading } = useSearchMedicalProfileQuery({
    params: { patientId },
  })

  const profile = response?.data?.profile ?? null
  const items = response?.data?.content ?? []

  const monthLabels = useMemo(() => getAppointmentMonthLabels(t), [t])

  const grouped = useMemo(
    () => groupAppointmentsByMonth(items, monthLabels),
    [items, monthLabels],
  )

  const rows = useMemo(
    () =>
      Object.entries(grouped).flatMap(([key, value]) => {
        if (value.length === 0) return []
        return [
          {
            kind: 'title' as const,
            id: `title-${key}`,
            title: key,
            isCurrentMonth: dayjs(value[0].appointmentDate).isSame(
              dayjs(),
              'month',
            ),
          },
          ...value.map((item) => ({
            kind: 'item' as const,
            id: item.id,
            item,
          })),
        ]
      }),
    [grouped],
  )

  if (isLoading) {
    return (
      <>
        <Header title={t('medicalProfileResultTitle')} />
        <LoadingBlocking />
      </>
    )
  }

  return (
    <>
      <Header title={t('medicalProfileResultTitle')} />

      <div className="flex flex-col gap-3 px-4 pt-4 pb-6">
        {profile ? (
          <ProfileSummaryCard
            profile={profile}
            expanded={expanded}
            onToggle={setExpanded}
            dobLabel={
              formatDate(
                profile.dob,
                DATE_TIME_TYPE.MMM_DD_YYYY,
                i18n.language,
              ) || '--'
            }
            dobValueExpanded={
              formatDate(profile.dob, undefined, i18n.language) || '--'
            }
            genderLabel={
              profile.gender === 'MALE'
                ? t('genderMale')
                : profile.gender === 'FEMALE'
                  ? t('genderFemale')
                  : '--'
            }
          />
        ) : null}

        <div className="h-px bg-[#F0F0F0]" aria-hidden />

        <div className="flex flex-col gap-3">
          {rows.map((row) =>
            row.kind === 'title' ? (
              <div key={row.id} className="flex items-center gap-2">
                <Text
                  size="base_14"
                  className={cn(
                    'text-[14px] font-medium uppercase leading-none tracking-[0.03em]',
                    row.isCurrentMonth ? 'text-[#A8071A]' : 'text-[#64748B]',
                  )}
                >
                  {row.title}
                </Text>
                {row.isCurrentMonth ? (
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-[#A8071A]"
                    aria-hidden
                  />
                ) : null}
              </div>
            ) : (
              <ItemHistoryAppointment key={row.id} item={row.item} />
            ),
          )}
        </div>
      </div>
    </>
  )
}

interface ProfileSummaryCardProps {
  profile: SearchMedicalProfilePatient
  expanded: boolean
  onToggle: (value: boolean) => void
  dobLabel: string
  dobValueExpanded: string
  genderLabel: string
}

function ProfileSummaryCard({
  profile,
  expanded,
  onToggle,
  dobLabel,
  dobValueExpanded,
  genderLabel,
}: ProfileSummaryCardProps) {
  const { t } = useTranslation('profile')

  const addressLabel = profile.address
    ? concatAddress(profile.address) || profile.address.fullAddress || '--'
    : '--'

  return (
    <Collapsible
      open={expanded}
      onOpenChange={onToggle}
      className="rounded-xl bg-white"
      style={{ boxShadow: '0px 1px 2px rgba(0,0,0,0.05)' }}
    >
      <div className="flex gap-4 p-4">
        <div className="shrink-0">
          <Avatar
            src={profile.avatarUrl ?? ''}
            alt={profile.fullName}
            size={88}
            hideCamera
            initials={profile.fullName.slice(0, 2)}
            textSize="6xl_32"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <Text size="lg_16" className="font-semibold text-text-primary">
            {profile.fullName}
          </Text>
          <Text size="sm_12" className="text-text-secondary font-normal">
            {dobLabel}
          </Text>
          <Text size="sm_12" className="text-[#64748B] font-normal">
            {profile.contactNumber}
          </Text>
          <div className="mt-1 inline-flex w-fit items-center justify-center rounded-full border border-[#FFCCC7] bg-[#FFF1F0] px-3 py-1">
            <Text
              size="xs_10"
              className="font-medium uppercase text-[#D43129] leading-none"
            >
              PATIENT ID: #{profile.profileCode}
            </Text>
          </div>
        </div>
      </div>

      <CollapsibleContent>
        <div className="flex flex-col gap-3 border-t border-[#F0F0F0] px-4 py-4">
          <Text size="base_14" className="font-semibold text-text-primary">
            {t('personalInformation')}
          </Text>
          <InfoRow label={t('dateOfBirth')} value={dobValueExpanded} />
          <InfoRow label={t('gender')} value={genderLabel} />
          <InfoRow
            label={t('phoneNumber')}
            value={profile.contactNumber || '--'}
          />
          <InfoRow label={t('email')} value={profile.email || '--'} />
          <InfoRow label={t('address')} value={addressLabel} />
        </div>
      </CollapsibleContent>

      <CollapsibleTrigger
        className="flex w-full items-center justify-center gap-1 border-t border-[#F0F0F0] py-2.5"
        aria-label={expanded ? 'Collapse profile' : 'Expand profile'}
      >
        <Icon
          name={expanded ? 'arrow_up' : 'arrow_down'}
          className="size-4 text-text-secondary"
        />
      </CollapsibleTrigger>
    </Collapsible>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <Text size="base_14" className="text-placeholder-input font-normal">
        {label}
      </Text>
      <Text size="base_14" className="text-text-primary text-right font-medium">
        {value}
      </Text>
    </div>
  )
}
