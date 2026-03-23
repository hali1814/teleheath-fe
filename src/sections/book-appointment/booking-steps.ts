import type { ComponentType } from 'react'
import type { BookingState } from '#/stores/booking-store'
import {
  ConsultationStep,
  SpecialtyStep,
  LocationStep,
  ScheduleStep,
  PatientStep,
} from '#/sections/book-appointment/steps'
import { ReviewStep } from '#/sections/book-appointment/steps/ReviewStep'

export type BookingStepConfig = {
  title: string
  component: ComponentType
  validate: (s: BookingState) => boolean
}

export const BOOKING_STEPS_HOSPITAL: BookingStepConfig[] = [
  {
    title: 'Select consultation type',
    component: ConsultationStep,
    validate: (s) => !!s.consultationTier,
  },
  {
    title: 'Select specialty',
    component: SpecialtyStep,
    validate: (s) => !!s.specialty,
  },
  {
    title: 'Select location',
    component: LocationStep,
    validate: (s) => !!s.branch,
  },
  {
    title: 'Select schedule',
    component: ScheduleStep,
    validate: (s) => !!s.appointmentDate && !!s.startTime && !!s.endTime,
  },
  {
    title: 'Select Patient & Medical Records',
    component: PatientStep,
    validate: (s) => !!s.patientProfile,
  },
  {
    title: 'Review & Payment',
    component: ReviewStep,
    validate: () => true,
  },
]

export const BOOKING_STEPS_DOCTOR: BookingStepConfig[] = [
  {
    title: 'Select location',
    component: LocationStep,
    validate: (s) => !!s.branch,
  },
  {
    title: 'Select schedule',
    component: ScheduleStep,
    validate: (s) => !!s.appointmentDate && !!s.startTime && !!s.endTime,
  },
  {
    title: 'Select Patient & Medical Records',
    component: PatientStep,
    validate: (s) => !!s.patientProfile,
  },
  {
    title: 'Review & Payment',
    component: ReviewStep,
    validate: () => true,
  },
]

export const BOOKING_STEPS_PACKAGE: BookingStepConfig[] = [
  {
    title: 'Select location',
    component: LocationStep,
    validate: (s) => !!s.branch,
  },
  {
    title: 'Select schedule',
    component: ScheduleStep,
    validate: (s) => !!s.appointmentDate && !!s.startTime && !!s.endTime,
  },
  {
    title: 'Select Patient & Medical Records',
    component: PatientStep,
    validate: (s) => !!s.patientProfile,
  },
  {
    title: 'Review & Payment',
    component: ReviewStep,
    validate: () => true,
  },
]
