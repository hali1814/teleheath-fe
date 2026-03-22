import {
  bookingStateToRequest,
  useBookAppointmentMutation,
} from '#/services/query/appointment/book-appointment'
import { useBookingStore } from '#/stores/booking-store'
import { useNavigate, useParams } from '@tanstack/react-router'
import { StepLayout } from './StepLayout'

export default function BookingPage({
  steps,
}: {
  steps: {
    title: string
    component: React.ComponentType<any>
    validate: (s: any) => boolean
  }[]
}) {
  const navigate = useNavigate()
  const { hospitalId } = useParams({
    from: '/app/book-appointment/hospital/(commonLayout)/$hospitalId',
  })
  const store = useBookingStore()
  const current = steps[store.step]

  const StepComponent = current.component

  const { mutate: bookAppointment } = useBookAppointmentMutation({
    onSuccess: ({ data }) => {
      if (!data?.id) return
      navigate({
        to: '/app/payment/khqr/$appointmentId',
        params: { appointmentId: data?.id },
      })
    },
  })

  const handleSubmit = () => {
    bookAppointment(
      bookingStateToRequest({
        ...store,
        hospitalId: hospitalId,
        bookingType: 'HOSPITAL',
        doctorId: '33333333-0000-0000-0000-000000000001',
      }),
    )
  }

  return (
    <StepLayout
      title={current.title}
      step={store.step}
      total={steps.length}
      onNext={store.next}
      onBack={store.back}
      onSubmit={handleSubmit}
      disableNext={!current.validate(store)}
    >
      <StepComponent />
    </StepLayout>
  )
}
