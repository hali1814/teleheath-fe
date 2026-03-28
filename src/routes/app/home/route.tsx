import Header from '#/sections/home/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import BottomNavigation from '#/components/BottomNavigation'
import { useState } from 'react'
import PopupAds from '#/sections/home/PopupAds'

export const Route = createFileRoute('/app/home')({
  component: RouteComponent,
})

function RouteComponent() {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <>
      <Header isHome />
      <div className="flex flex-col gap-[20px] mt-[20px]">
        <Outlet />
      </div>
      <BottomNavigation />
      <PopupAds isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
