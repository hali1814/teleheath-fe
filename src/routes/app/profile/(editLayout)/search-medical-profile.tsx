import TextInputBase from '#/components/input/TextInputBase'
import LoadingBlocking from '#/components/LoadingBlocking'
import { Button } from '#/components/ui/button'
import { Header } from '#/sections/home'
import { useSearchMedicalProfileMutation } from '#/services/query/profile/searchMedicalProfile'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

export const Route = createFileRoute(
  '/app/profile/(editLayout)/search-medical-profile',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('profile')
  const router = useRouter()
  const [patientId, setPatientId] = useState('')

  const { mutateAsync: searchMedicalProfile, isPending } =
    useSearchMedicalProfileMutation({ isShowError: false })

  const handleCancel = () => {
    router.history.back()
  }

  const handleRequest = async () => {
    const trimmed = patientId.trim()
    if (!trimmed) return

    try {
      const res = await searchMedicalProfile({ patientId: trimmed })
      const hasProfile = !!res?.data?.profile

      if (!res?.success || !hasProfile) {
        toast.error(t('searchMedicalProfileNotFound'))
        return
      }

      router.navigate({
        to: '/app/profile/medical-profile-result',
        search: { patientId: trimmed },
      })
    } catch (error) {
      const axiosError = error as AxiosError<{ data?: { errorCode?: string } }>
      const errorCode = axiosError?.response?.data?.data?.errorCode
      toast.error(
        errorCode === 'PROFILE_NOT_FOUND'
          ? t('searchMedicalProfileNotFound')
          : t('searchMedicalProfileError'),
      )
    }
  }

  return (
    <>
      <Header title={t('searchMedicalProfileTitle')} />

      <div className="flex flex-col gap-4 px-4 pt-4">
        {/* <Text size="base_14" className="text-text-secondary font-normal">
          {t('searchMedicalProfileDescription')}
        </Text> */}

        <TextInputBase
          label={t('patientIdLabel')}
          isRequired
          placeholder={t('enterPatientIdPlaceholder')}
          value={patientId}
          onChange={(event) => setPatientId(event.target.value)}
        />

        <div className="mt-2 flex items-center gap-3">
          <Button
            type="button"
            className="h-[45px] flex-1 rounded-full bg-[#E6E6E6] text-text-primary hover:bg-[#E6E6E6]/80"
            onClick={handleCancel}
            disabled={isPending}
          >
            {t('searchMedicalProfileCancel')}
          </Button>
          <Button
            type="button"
            className="bg-secondary h-[45px] flex-1 rounded-full"
            disabled={!patientId.trim() || isPending}
            onClick={handleRequest}
          >
            {t('searchMedicalProfileRequest')}
          </Button>
        </div>
      </div>

      <LoadingBlocking isLoading={isPending} />
    </>
  )
}
