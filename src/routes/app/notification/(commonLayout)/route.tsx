import { Header } from '#/sections/home'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/notification/(commonLayout)')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['common'])
  return (
    <div>
      <Header title={t('notificationsTitle')} />
      <Outlet />
    </div>
  )
}
