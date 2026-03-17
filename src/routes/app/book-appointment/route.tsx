import Header from '#/sections/home/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/book-appointment')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header title="Book Appointment" />
      <Outlet />
    </div>
  )
}
