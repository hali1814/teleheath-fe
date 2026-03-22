import BottomNavigation from '#/components/BottomNavigation'
import { Header } from '#/sections/home'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/app/history')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation('common')
  const title = t('bottomNavigation.history')

  return (
    <div className="pb-[100px]">
      <Header title={title} isCenter />
      <Outlet />
      <BottomNavigation />
    </div>
  )
}
