import Header from '#/sections/home/Header'
import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/profile/(editLayout)')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('profile')
  const { pathname } = useLocation()

  const title = useMemo(() => {
    switch (pathname) {
      case '/app/profile/medical-profiles':
        return t('medicalProfiles')
      case '/app/profile/edit':
        return t('profileInformation')

      default:
        break
    }
  }, [pathname])

  return (
    <div>
      <Header title={title} />
      <Outlet />
    </div>
  )
}
