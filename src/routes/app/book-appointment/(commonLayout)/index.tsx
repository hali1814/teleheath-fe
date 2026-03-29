import BookingOffline from '#/sections/book-appointment/BookingOffline'
import HeroBanner from '#/sections/book-appointment/HeroBanner'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

const bookAppointmentSearchSchema = z.object({
  country: z.string().optional(),
})

export type BookAppointmentSearch = z.infer<typeof bookAppointmentSearchSchema>

export const Route = createFileRoute('/app/book-appointment/(commonLayout)/')({
  validateSearch: (search: Record<string, unknown>): BookAppointmentSearch =>
    bookAppointmentSearchSchema.parse(search ?? {}),
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <HeroBanner />
      <BookingOffline />
    </div>
  )
}
