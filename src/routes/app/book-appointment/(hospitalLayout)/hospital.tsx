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

export const Route = createFileRoute(
  '/app/book-appointment/(hospitalLayout)/hospital',
)({
  component: RouteComponent,
})

const steps = [
  {
    title: 'Select consultation type',
    component: ConsultationStep,
    validate: (s: any) => !!s.consultationType,
  },
  {
    title: 'Select specialty',
    component: SpecialtyStep,
    validate: (s: any) => !!s.specialty,
  },
  {
    title: 'Select location',
    component: LocationStep,
    validate: (s: any) => !!s.location,
  },
  {
    title: 'Select schedule',
    component: ScheduleStep,
    validate: (s: any) => !!s.appointmentDate && !!s.schedules?.length,
  },
  {
    title: 'Select Patient & Medical Records',
    component: PatientStep,
    validate: (s: any) => !!s.patient,
  },
  {
    title: 'Review & Payment',
    component: ReviewStep,
    validate: (s: any) => true,
  },
]

function RouteComponent() {
  return <BookingPage steps={steps} />
}
