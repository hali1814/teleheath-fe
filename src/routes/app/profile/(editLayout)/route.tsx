import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/profile/(editLayout)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
