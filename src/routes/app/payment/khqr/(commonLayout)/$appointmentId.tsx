import { createFileRoute, useParams } from '@tanstack/react-router'
import { KhqrPaymentView } from '#/sections/payment/KhqrPaymentView'

export const Route = createFileRoute(
  '/app/payment/khqr/(commonLayout)/$appointmentId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  const { appointmentId } = useParams({
    from: '/app/payment/khqr/(commonLayout)/$appointmentId',
  })

  return <KhqrPaymentView appointmentId={appointmentId} />
}
