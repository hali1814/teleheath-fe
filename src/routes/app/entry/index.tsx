import {
  createFileRoute,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Image from '#/components/image'
import Text from '#/components/text'
import { Spinner } from '#/components/ui/spinner'
import { useAuthCamIDMutation } from '#/services/query/auth/authCamID'
import { useProfileStore } from '#/stores/profile'
import { setTokens } from '#/stores/token'

export const Route = createFileRoute('/app/entry/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('common')
  const navigate = useNavigate()
  const { search } = useLocation()
  const searchParams = new URLSearchParams(search as Record<string, string>)

  //

  const code = searchParams.get('token')

  const [isVerifying, setIsVerifying] = useState(true)
  const { mutate: authCamID } = useAuthCamIDMutation({
    onSuccess: (data) => {
      if (data.success) {
        setTokens({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
        useProfileStore.getState().setProfile(data.data.user)

        navigate({ to: '/app/home' })
        return
      }

      setIsVerifying(false)
    },
    onError: () => {
      setIsVerifying(false)
    },
  })

  useEffect(() => {
    if (!code) setIsVerifying(false)

    authCamID({ partnerToken: code! })
  }, [])

  if (!isVerifying) {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 pb-24 pt-12"
      >
        <Image
          src="/logo.svg"
          alt=""
          className="mx-auto h-14 w-14 object-contain"
          width={56}
          height={56}
        />
        <div className="flex max-w-[320px] flex-col gap-3 text-center">
          <Text size="xl_18" className="font-semibold text-text-primary">
            {t('entry.needsAuthTitle')}
          </Text>
          <Text
            size="sm_12"
            className="font-normal leading-relaxed text-[#64748B]"
          >
            {t('entry.needsAuthSubtitle')}
          </Text>
        </div>
      </div>
    )
  }

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex min-h-dvh flex-col items-center justify-center gap-8 px-6 pb-24 pt-12"
    >
      <div className="flex flex-col items-center gap-6 text-center">
        <div className="animate-pulse">
          <Image
            src="/logo.svg"
            alt=""
            className="mx-auto h-14 w-14 object-contain"
            width={56}
            height={56}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Text size="xl_18" className="font-semibold text-text-primary">
            {t('entry.verifyingTitle')}
          </Text>
          <Text
            size="sm_12"
            className="max-w-[320px] font-normal leading-relaxed text-[#64748B]"
          >
            {t('entry.verifyingSubtitle')}
          </Text>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Spinner className="size-9 text-primary" aria-hidden />
        <Text size="xs_10" className="uppercase tracking-wider text-[#94A3B8]">
          {t('entry.loadingLabel')}
        </Text>
      </div>
    </div>
  )
}
