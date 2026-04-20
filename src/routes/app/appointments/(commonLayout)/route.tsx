import BottomNavigation from '#/components/BottomNavigation'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/appointments/(commonLayout)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Outlet />
      <BottomNavigation />
    </>
  )
}
