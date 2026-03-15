import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/profile/(commonLayout)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      commonLayout
      <Outlet />
    </div>
  )
}
