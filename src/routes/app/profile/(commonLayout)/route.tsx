import BottomNavigation from '#/components/BottomNavigation'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/profile/(commonLayout)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="pb-[120px]">
      <Outlet />
      <BottomNavigation />
    </div>
  )
}
