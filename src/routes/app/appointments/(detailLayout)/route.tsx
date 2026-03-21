import { Header } from '#/sections/home'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/appointments/(detailLayout)')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['appointment'])
  const title = t('appointmentDetails')
  return (
    <div>
      <Header title={title} />
      <Outlet />
    </div>
  )
}
