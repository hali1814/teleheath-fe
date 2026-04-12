import {
  createFileRoute,
  Outlet,
  useLocation,
  useNavigate,
} from '@tanstack/react-router'
import { getToken, setTokens } from '#/stores/token'
import { useGetProfileQuery } from '#/services/query/profile/getProfile'
import { useProfileStore } from '#/stores/profile'
import { useAuthCamIDMutation } from '#/services/query/auth/authCamID'
import { useEffect } from 'react'
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
  const { setProfile, profile } = useProfileStore()
  useGetProfileQuery({
    params: {},
    onSuccess: (data) => {
      if (data.success) {
        console.log('data', data)
        !profile && setProfile(data.data)
      }
    },
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 30,
    enabled: !!getToken(),
  })

  const navigate = useNavigate()

  const { search } = useLocation()

  const searchParams = new URLSearchParams(search as Record<string, string>)

  ////

  const code = searchParams.get('token')
  const lang = searchParams.get('lang')

  const { i18n } = useTranslation('common')

  const { mutate: authCamID } = useAuthCamIDMutation({
    onSuccess: (data) => {
      if (data.success) {
        setTokens({
          accessToken: data.data.accessToken,
          refreshToken: data.data.refreshToken,
        })
        // setProfile(data.data.user)
      }
    },
    onError: () => {
      navigate({ to: '/app/entry' })
    },
  })

  useEffect(() => {
    if (!code) {
      return
    }
    authCamID({ partnerToken: code! })

    if (lang) {
      // lang is km or en
      if (lang === 'km') {
        i18n.changeLanguage('km')
      } else if (lang === 'en') {
        i18n.changeLanguage('en')
      }
    }
  }, [])

  return (
    <div className="bg-background min-h-screen">
      <Outlet />
    </div>
  )
}
