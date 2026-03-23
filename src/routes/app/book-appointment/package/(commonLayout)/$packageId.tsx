import { createFileRoute, useParams } from '@tanstack/react-router'
import BookingPage from '#/sections/book-appointment/BookingPage'
import { BOOKING_STEPS_PACKAGE } from '#/sections/book-appointment/booking-steps'

export const Route = createFileRoute(
  '/app/book-appointment/package/(commonLayout)/$packageId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { packageId } = useParams({
    from: '/app/book-appointment/package/(commonLayout)/$packageId',
  })
  return (
    <BookingPage
      steps={BOOKING_STEPS_PACKAGE}
      context={{ flow: 'PACKAGE', packageId }}
    />
  )
}
