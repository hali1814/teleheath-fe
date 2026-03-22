import { createFileRoute } from '@tanstack/react-router'
import BookingPage from '#/sections/book-appointment/BookingPage'
import {
  ConsultationStep,
  SpecialtyStep,
  LocationStep,
  ScheduleStep,
  PatientStep,
} from '#/sections/book-appointment/steps'
import { ReviewStep } from '#/sections/book-appointment/steps/ReviewStep'
import type { BookingState } from '#/stores/booking-store'

export const Route = createFileRoute(
  '/app/book-appointment/hospital/(commonLayout)/$hospitalId',
)({
  component: RouteComponent,
})

const steps = [
  {
    title: 'Select consultation type',
    component: ConsultationStep,
    validate: (s: BookingState) => !!s.consultationTierId,
  },
  {
    title: 'Select specialty',
    component: SpecialtyStep,
    validate: (s: BookingState) => !!s.specialtyId,
  },
  {
    title: 'Select location',
    component: LocationStep,
    validate: (s: BookingState) => !!s.branchId,
  },
  {
    title: 'Select schedule',
    component: ScheduleStep,
    validate: (s: BookingState) =>
      !!s.appointmentDate && !!s.startTime && !!s.endTime,
  },
  {
    title: 'Select Patient & Medical Records',
    component: PatientStep,
    validate: (s: BookingState) => !!s.patientProfileId,
  },
  {
    title: 'Review & Payment',
    component: ReviewStep,
    validate: (s: BookingState) => true,
  },
]

function RouteComponent() {
  return <BookingPage steps={steps} />
}
