import Header from '#/sections/home/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/profile/(editLayout)')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('profile')
  return (
    <div>
      <Header title={t('profileInformation')} />
      <Outlet />
    </div>
  )
}
