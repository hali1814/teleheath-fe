import { createFileRoute, useParams } from '@tanstack/react-router'
import BookingPage from '#/sections/book-appointment/BookingPage'
import { BOOKING_STEPS_DOCTOR } from '#/sections/book-appointment/booking-steps'

export const Route = createFileRoute(
  '/app/book-appointment/doctor/(commonLayout)/$doctorId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { doctorId } = useParams({
    from: '/app/book-appointment/doctor/(commonLayout)/$doctorId',
  })
  return (
    <BookingPage
      steps={BOOKING_STEPS_DOCTOR}
      context={{ flow: 'DOCTOR', doctorId }}
    />
  )
}
