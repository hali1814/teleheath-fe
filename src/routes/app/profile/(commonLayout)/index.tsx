import { Icon } from '#/components/icon'
import Image from '#/components/image'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Card, CardContent } from '#/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '#/components/ui/dialog'
import CardNavigate from '#/sections/common/CardNavigate'
import Avatar from '#/sections/profile/Avatar'
import effectPng from '#/assets/images/profile/effect.png'

import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { toast } from 'sonner'
import { BottomSheetTranslate } from '#/sections/profile/BottomSheetTranslate'
import { clearProfile, useProfileStore } from '#/stores/profile'
import { clearTokens } from '#/stores/token'
import { debounceEndSession } from '#/services/network/axios.service'
import { http } from '#/services/network/http-request'
import { concatAddress, formatDate, getInitialsFromName } from '#/utils'
import RequireLogin from '#/components/RequireLogin'

export const Route = createFileRoute('/app/profile/(commonLayout)/')({
  component: RouteComponent,
})

const DELETE_ACCOUNT_TEST_PHONE = '972999999'

function normalizePhoneForInternalTest(phone?: string | null) {
  const digits = phone?.replace(/\D/g, '') ?? ''
  const withoutInternationalPrefix = digits.startsWith('00')
    ? digits.slice(2)
    : digits
  const withoutCountryCode = withoutInternationalPrefix.startsWith('855')
    ? withoutInternationalPrefix.slice(3)
    : withoutInternationalPrefix
  return withoutCountryCode.replace(/^0+/, '')
}

function canShowDeleteAccountOption(phone?: string | null) {
  return normalizePhoneForInternalTest(phone) === DELETE_ACCOUNT_TEST_PHONE
}

function RouteComponent() {
  const { t, i18n } = useTranslation('profile')
  const navigate = useNavigate()
  const [openBottomSheet, setOpenBottomSheet] = useState(false)
  const [openLogoutConfirm, setOpenLogoutConfirm] = useState(false)
  const [openDeleteAccountConfirm, setOpenDeleteAccountConfirm] =
    useState(false)
  const [isDeletingAccount, setIsDeletingAccount] = useState(false)

  const endNativeSession = () => {
    clearTokens()
    clearProfile()
    debounceEndSession()
  }

  const handleLogout = async () => {
    try {
      await http.post('/auth/logout', {})
    } catch {
      // Native shell will clear local session even if the network is unavailable.
    }
    endNativeSession()
    setOpenLogoutConfirm(false)
  }

  const handleDeleteAccount = async () => {
    if (isDeletingAccount) return
    setIsDeletingAccount(true)
    try {
      await http.delete<void>('/auth/account')
      setOpenDeleteAccountConfirm(false)
      endNativeSession()
    } catch {
      toast.error(t('deleteAccountFailed'))
      setIsDeletingAccount(false)
    }
  }

  const user = useProfileStore((s) => s.profile)

  if (!user?.id) {
    return <RequireLogin />
  }

  const showDeleteAccountOption = canShowDeleteAccountOption(user.phone)

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
              value={formatDate(user?.dob, undefined, i18n.language) || '--'}
            />
            <InfoRow
              label={t('gender')}
              value={
                user?.gender === 'MALE'
                  ? t('genderMale')
                  : user?.gender === 'FEMALE'
                    ? t('genderFemale')
                    : '--'
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
            title={t('searchMedicalProfiles')}
            icon="search_medical_profile"
            onClick={() =>
              navigate({ to: '/app/profile/search-medical-profile' })
            }
          />

          <CardNavigate
            title={t('language')}
            icon="language"
            onClick={() => setOpenBottomSheet(true)}
          />

          {showDeleteAccountOption ? (
            <CardNavigate
              title={t('deleteAccount')}
              icon="appointment_cancel"
              onClick={() => setOpenDeleteAccountConfirm(true)}
            />
          ) : null}

          <CardNavigate
            title={t('logout')}
            icon="logout"
            hideArrow
            onClick={() => setOpenLogoutConfirm(true)}
          />
        </div>

        <Dialog open={openLogoutConfirm} onOpenChange={setOpenLogoutConfirm}>
          <DialogContent className="gap-0 rounded-2xl bg-white p-6 max-w-[min(calc(100%-3rem),300px)]">
            <DialogHeader className="space-y-2 text-center">
              <DialogTitle className="text-lg font-semibold text-text-primary">
                {t('logoutConfirmTitle')}
              </DialogTitle>
              <DialogDescription className="text-sm text-placeholder-input">
                {t('logoutConfirmDescription')}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex-row gap-3 sm:justify-stretch">
              <Button
                variant="outline"
                className="flex-1 rounded-full"
                onClick={() => setOpenLogoutConfirm(false)}
              >
                {t('logoutCancel')}
              </Button>
              <Button
                className="flex-1 rounded-full bg-secondary"
                onClick={handleLogout}
              >
                {t('logoutConfirm')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog
          open={openDeleteAccountConfirm}
          onOpenChange={setOpenDeleteAccountConfirm}
        >
          <DialogContent className="gap-0 rounded-2xl bg-white p-6 max-w-[min(calc(100%-3rem),300px)]">
            <DialogHeader className="space-y-2 text-center">
              <DialogTitle className="text-lg font-semibold text-text-primary">
                {t('deleteAccountConfirmTitle')}
              </DialogTitle>
              <DialogDescription className="text-sm text-placeholder-input">
                {t('deleteAccountConfirmDescription')}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-6 flex-row gap-3 sm:justify-stretch">
              <Button
                variant="outline"
                className="flex-1 rounded-full"
                disabled={isDeletingAccount}
                onClick={() => setOpenDeleteAccountConfirm(false)}
              >
                {t('deleteAccountCancel')}
              </Button>
              <Button
                className="flex-1 rounded-full bg-secondary"
                disabled={isDeletingAccount}
                onClick={handleDeleteAccount}
              >
                {t('deleteAccountConfirm')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
