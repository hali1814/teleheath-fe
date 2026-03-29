import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/specialty/search')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
