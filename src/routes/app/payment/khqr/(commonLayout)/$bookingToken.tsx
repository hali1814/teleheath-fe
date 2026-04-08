import { createFileRoute, useParams } from '@tanstack/react-router'
import { KhqrPaymentView } from '#/sections/payment/KhqrPaymentView'

export const Route = createFileRoute(
  '/app/payment/khqr/(commonLayout)/$bookingToken',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { bookingToken } = useParams({
    from: '/app/payment/khqr/(commonLayout)/$bookingToken',
  })

  return <KhqrPaymentView bookingToken={bookingToken} />
}
