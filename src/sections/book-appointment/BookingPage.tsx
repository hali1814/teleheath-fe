import { useBookingStore } from '#/stores/booking-store'
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
  const store = useBookingStore()
  const current = steps[store.step]

  const StepComponent = current.component

  return (
    <StepLayout
      title={current.title}
      step={store.step}
      total={steps.length}
      onNext={store.next}
      onBack={store.back}
      disableNext={!current.validate(store)}
    >
      <StepComponent />
    </StepLayout>
  )
}
