import TextInputBase from '#/components/input/TextInputBase'
import Text from '#/components/text'
import { Button } from '#/components/ui/button'
import { Header } from '#/sections/home'
import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute(
  '/app/profile/(editLayout)/search-medical-profile',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('profile')
  const router = useRouter()
  const [patientId, setPatientId] = useState('')

  const handleCancel = () => {
    router.history.back()
  }

  const handleRequest = () => {
    if (!patientId.trim()) return
    // TODO: integrate request OTP API
    router.navigate({ to: '/app/profile/medical-profile-result' })
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
          >
            {t('searchMedicalProfileCancel')}
          </Button>
          <Button
            type="button"
            className="bg-secondary h-[45px] flex-1 rounded-full"
            disabled={!patientId.trim()}
            onClick={handleRequest}
          >
            {t('searchMedicalProfileRequest')}
          </Button>
        </div>
      </div>
    </>
  )
}
