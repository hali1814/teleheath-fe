import {
  createFileRoute,
  Outlet,
  useLocation,
  useRouter,
} from '@tanstack/react-router'
import { clearTokens, getToken, setTokens } from '#/stores/token'
import { useGetProfileQuery } from '#/services/query/profile/getProfile'
import { useProfileStore } from '#/stores/profile'
import { useAuthCamIDMutation } from '#/services/query/auth/authCamID'
import { getPaymentResume } from '#/services/query/payment/get-payment-resume'
import LoadingBlocking from '#/components/LoadingBlocking'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app')({
  component: App,
  beforeLoad: ({ location }) => {
    const path = location.pathname
    if (path === '/app/home' || path.startsWith('/app/home/')) {
      return
    }
  },
})

function App() {
  const { setProfile, profile, clearProfile } = useProfileStore()
  useGetProfileQuery({
    params: {},
    onSuccess: (data) => {
      if (data.success) {
        !profile && setProfile(data.data)
      }
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
    enabled: !!getToken(),
  })

  const router = useRouter()

  const { search } = useLocation()

  const searchParams = new URLSearchParams(search as Record<string, string>)

  ////

  const code = searchParams.get('token')
  const lang = searchParams.get('lang')
  const path = searchParams.get('redirect')

  const isPartnerTokenExchange = Boolean(code && code !== 'guest')
  const [ssoExchangeComplete, setSsoExchangeComplete] = useState(
    () => !isPartnerTokenExchange,
  )

  const { i18n, t } = useTranslation('common')

  const { mutate: authCamID } = useAuthCamIDMutation({
    onSuccess: async (data) => {
      if (data.success) {
        setTokens({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
        if (path) {
          router.navigate({ href: path })
          return
        }
        // Không có redirect param → check resume để khôi phục màn thanh toán
        // khi WebView bị thu hồi. Case WebView còn sống thì nhánh này không
        // chạy (SSO không re-run).
        try {
          const resume = await getPaymentResume()
          const r = resume?.data
          if (r?.status === 'PENDING' && r.bookingToken) {
            router.navigate({
              to: '/app/payment/khqr/$bookingToken',
              params: { bookingToken: r.bookingToken },
            })
            return
          }
          if (r?.status === 'SUCCESS' && r.appointmentCode) {
            router.navigate({
              to: '/app/book-appointment/success/$appointmentCode',
              params: { appointmentCode: r.appointmentCode },
            })
            return
          }
        } catch {
          // Resume lỗi → giữ hành vi cũ
        }
        // setProfile(data.data.user)
      }
    },
    onError: () => {
      clearTokens()
      clearProfile()
      router.navigate({ to: '/app/entry' })
    },
  })

  useEffect(() => {
    if (lang) {
      // lang is km or en
      if (lang === 'km') {
        i18n.changeLanguage('km')
      } else if (lang === 'en') {
        i18n.changeLanguage('en')
      }
    }

    if (code == 'guest') {
      //logout
      clearTokens()
      clearProfile()
      return
    }

    if (!code) {
      return
    }

    authCamID(
      { partnerToken: code },
      {
        onSettled: () => {
          setSsoExchangeComplete(true)
        },
      },
    )
  }, [])

  return (
    <div className="bg-background min-h-screen">
      <LoadingBlocking
        isLoading={isPartnerTokenExchange && !ssoExchangeComplete}
        label={t('entry.verifyingTitle')}
      />
      <Outlet />
    </div>
  )
}
