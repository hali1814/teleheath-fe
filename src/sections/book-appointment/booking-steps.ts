import type { ComponentType } from 'react'
import type { BookingState } from '#/stores/booking-store'
import {
  SpecialtyStep,
  LocationStep,
  ScheduleStep,
  PatientStep,
} from '#/sections/book-appointment/steps'
import { ReviewStep } from '#/sections/book-appointment/steps/ReviewStep'
import { RoomStep } from './steps/RoomStep'
import { ServiceStep } from './steps/ServiceStep'

export type BookingStepConfig = {
  title: string
  component: ComponentType
  validate: (s: BookingState) => boolean
}

export const BOOKING_STEPS_HOSPITAL: BookingStepConfig[] = [
  {
    title: 'Select Specialty',
    component: SpecialtyStep,
    validate: (s) => !!s.specialty,
  },
  {
    title: 'Select Location',
    component: () => LocationStep({ type: 'HOSPITAL' }),
    validate: (s) => !!s.branch,
  },
  {
    title: 'Select Room',
    component: () => RoomStep({ type: 'HOSPITAL' }),
    validate: (s) => !!s.room,
  },
  {
    title: 'Select Schedule',
    component: ScheduleStep,
    validate: (s) => !!s.appointmentDate && !!s.startTime && !!s.endTime,
  },
  {
    title: 'Select Patient & Medical Records',
    component: PatientStep,
    validate: (s) => !!s.patientProfile,
  },
  {
    title: 'Select add-on services',
    component: ServiceStep,
    validate: () => true,
  },
  {
    title: 'Review & Confirm',
    component: ReviewStep,
    validate: (s) =>
      (!!s.paymentMethod && s.feeInfo.totalAmount > 0) ||
      s.feeInfo.totalAmount === 0,
  },
]

export const BOOKING_STEPS_DOCTOR: BookingStepConfig[] = [
  {
    title: 'Select Location',
    component: () => LocationStep({ type: 'DOCTOR' }),
    validate: (s) => !!s.branch,
  },
  {
    title: 'Select Schedule',
    component: ScheduleStep,
    validate: (s) => !!s.appointmentDate && !!s.startTime && !!s.endTime,
  },
  {
    title: 'Select Patient & Medical Record',
    component: PatientStep,
    validate: (s) => !!s.patientProfile,
  },
  {
    title: 'Select add-on services',
    component: ServiceStep,
    validate: () => true,
  },
  {
    title: 'Review & Confirm',
    component: ReviewStep,
    validate: (s) =>
      (!!s.paymentMethod && s.feeInfo.totalAmount > 0) ||
      s.feeInfo.totalAmount === 0,
  },
]

export const BOOKING_STEPS_PACKAGE: BookingStepConfig[] = [
  {
    title: 'Select Location',
    component: () => LocationStep({ type: 'PACKAGE' }),
    validate: (s) => !!s.branch,
  },
  {
    title: 'Select Schedule',
    component: ScheduleStep,
    validate: (s) => !!s.appointmentDate && !!s.startTime && !!s.endTime,
  },
  {
    title: 'Select Patient & Medical Record',
    component: PatientStep,
    validate: (s) => !!s.patientProfile,
  },
  {
    title: 'Select add-on services',
    component: ServiceStep,
    validate: () => true,
  },
  {
    title: 'Review & Confirm',
    component: ReviewStep,
    validate: (s) =>
      (!!s.paymentMethod && s.feeInfo.totalAmount > 0) ||
      s.feeInfo.totalAmount === 0,
  },
]
