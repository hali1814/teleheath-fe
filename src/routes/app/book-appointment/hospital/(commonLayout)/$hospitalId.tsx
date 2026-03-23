import { createFileRoute, useParams } from '@tanstack/react-router'
import BookingPage from '#/sections/book-appointment/BookingPage'
import { BOOKING_STEPS_HOSPITAL } from '#/sections/book-appointment/booking-steps'

export const Route = createFileRoute(
  '/app/book-appointment/hospital/(commonLayout)/$hospitalId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { hospitalId } = useParams({
    from: '/app/book-appointment/hospital/(commonLayout)/$hospitalId',
  })
  return (
    <BookingPage
      steps={BOOKING_STEPS_HOSPITAL}
      context={{ flow: 'HOSPITAL', hospitalId }}
    />
  )
}
