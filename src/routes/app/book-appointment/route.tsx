import Header from '#/sections/home/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/book-appointment')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation(['book-appointment'])

  return (
    <div>
      <Header title={t('title')} />
      <Outlet />
    </div>
  )
}
