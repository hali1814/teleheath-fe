import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import CardNavigate from '#/sections/common/CardNavigate'
import Avatar from '#/sections/profile/Avatar'
import effectPng from '#/assets/images/profile/effect.png'

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { BottomSheetTranslate } from '#/sections/profile/BottomSheetTranslate'
import { useProfileStore } from '#/stores/profile'
import { concatAddress, formatDate, getInitialsFromName } from '#/utils'

export const Route = createFileRoute('/app/profile/(commonLayout)/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('profile')
  const navigate = useNavigate()
  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  const user = useProfileStore((s) => s.profile)

  return (
    <div>
      {/* header */}
      <div className="flex h-[220px] items-end gap-[10px] relative">
        <Image src={effectPng} alt="avatar" />

        <div className="absolute  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
          <Avatar
            src={user?.avatarUrl}
            alt={user?.fullName ?? ''}
            initials={getInitialsFromName(user?.fullName)}
            onCameraClick={() => {}}
          />
        </div>
        <Text
          size="4xl_24"
          className="font-semibold text-text-primary absolute left-1/2 -translate-x-1/2  -translate-y-1/2 bottom-[-15px]"
        >
          {user?.fullName}
        </Text>
      </div>

      <div className="flex justify-center mt-2">
        <Button
          className="w-[200px] mt-2 bg-secondary"
          onClick={() =>
            navigate({
              to: '/app/profile/edit',
              search: { idMember: undefined, isUserProfile: true },
            })
          }
        >
          <Icon name="pencil" className="size-4" />
          {t('editProfile')}
        </Button>
      </div>

      {/* Personal Information card */}
      <div className="px-4">
        <Card
          className="mt-6 gap-4 rounded-xl border-placeholder-input"
          style={{ boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)' }}
        >
          <CardContent className="flex flex-col gap-4 p-4">
            <Text size="lg_16" className="font-semibold text-text-primary">
              {t('personalInformation')}
            </Text>

            <InfoRow
              label={t('dateOfBirth')}
              value={formatDate(user?.dateOfBirth) || '--'}
            />
            <InfoRow
              label={t('gender')}
              value={
                user?.gender === 'MALE' ? t('genderMale') : t('genderFemale')
              }
            />
            <InfoRow label={t('phoneNumber')} value={user?.phone ?? '--'} />
            <InfoRow label={t('email')} value={user?.email ?? '--'} />
            <InfoRow
              label={t('address')}
              value={user?.address ? concatAddress(user?.address) : '--'}
            />
          </CardContent>
        </Card>

        <div className="mt-5 gap-4 flex flex-col">
          <CardNavigate
            title={t('medicalProfiles')}
            icon="clipboard"
            onClick={() => navigate({ to: '/app/profile/medical-profiles' })}
          />

          <CardNavigate
            title={t('language')}
            icon="language"
            onClick={() => setOpenBottomSheet(true)}
          />
        </div>

        <BottomSheetTranslate
          open={openBottomSheet}
          onClose={() => setOpenBottomSheet(false)}
        />
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 pb-3 last:pb-0">
      <Text size="base_14" className="text-placeholder-input font-normal">
        {label}
      </Text>
      <Text size="base_14" className="text-text-primary text-right font-medium">
        {value}
      </Text>
    </div>
  )
}
