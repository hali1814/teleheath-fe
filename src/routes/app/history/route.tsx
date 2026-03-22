import BottomNavigation from '#/components/BottomNavigation'

import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/history')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="pb-[100px]">
      <Outlet />
      <BottomNavigation />
    </div>
  )
}
