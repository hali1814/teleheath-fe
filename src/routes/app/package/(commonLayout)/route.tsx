import Header from '#/sections/home/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/app/package/(commonLayout)')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <Header title="Packages" />
      <Outlet />
    </div>
  )
}
