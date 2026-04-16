import Header from '#/sections/home/Header'
import { useProfileEditLayoutTitleStore } from '#/stores/profile-edit-layout-title'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/profile/(editLayout)')({
  component: RouteComponent,
})

function RouteComponent() {
  const title = useProfileEditLayoutTitleStore((s) => s.title)

  return (
    <div>
      <Header title={title} />
      <Outlet />
    </div>
  )
}
