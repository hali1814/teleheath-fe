import Header from '#/sections/home/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/doctor/(commonLayout)')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['doctor', 'common'])
  return (
    <div>
      <Header title={t('title')} />
      <Outlet />
    </div>
  )
}
