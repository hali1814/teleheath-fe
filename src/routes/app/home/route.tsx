import Header from '#/sections/home/Header'
import { createFileRoute, Outlet } from '@tanstack/react-router'
import BottomNavigation from '#/components/BottomNavigation'
import PopupAds from '#/sections/home/PopupAds'
import { FloatChatAI } from '#/sections/home/FloatChatAI'
import { useAppStore } from '#/stores/app'

export const Route = createFileRoute('/app/home')({
  component: RouteComponent,
})

function RouteComponent() {
  const { popup, setPopup } = useAppStore()

  return (
    <>
      <div className="flex flex-col gap-[20px] mt-[20px]">
        <Outlet />
      </div>
      <BottomNavigation />
      <FloatChatAI />
      <PopupAds isOpen={popup} onClose={() => setPopup(false)} />
    </>
  )
}
