import BookingOffline from '#/sections/book-appointment/BookingOffline'
import HeroBanner from '#/sections/book-appointment/HeroBanner'
import OnlineDoctor from '#/sections/book-appointment/OnlineDoctor'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/book-appointment/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <HeroBanner />
      <BookingOffline />
      <OnlineDoctor />
    </div>
  )
}
