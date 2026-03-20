import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/search/(commonLayout)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  )
}
