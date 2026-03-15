import Header from '#/sections/home/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import BottomNavigation from '#/components/BottomNavigation'

export const Route = createFileRoute('/app/home')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Header isHome />
      <div className="flex flex-col gap-[20px] px-[16px] mt-[20px]">
        <Outlet />
      </div>
      <BottomNavigation />
    </>
  )
}
