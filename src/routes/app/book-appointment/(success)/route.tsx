import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/book-appointment/(success)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
