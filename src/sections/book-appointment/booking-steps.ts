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
  titleKey: string
  component: ComponentType
  validate: (s: BookingState) => boolean
}

export const BOOKING_STEPS_HOSPITAL: BookingStepConfig[] = [
  {
    titleKey: 'stepTitles.selectSpecialty',
    component: SpecialtyStep,
    validate: (s) => !!s.specialty,
  },
  {
    titleKey: 'stepTitles.selectLocation',
    component: () => LocationStep({ type: 'HOSPITAL' }),
    validate: (s) => !!s.branch,
  },
  {
    titleKey: 'stepTitles.selectRoom',
    component: () => RoomStep({ type: 'HOSPITAL' }),
    validate: (s) => !!s.room,
  },
  {
    titleKey: 'stepTitles.selectSchedule',
    component: ScheduleStep,
    validate: (s) => !!s.appointmentDate && !!s.startTime && !!s.endTime,
  },
  {
    titleKey: 'stepTitles.selectPatientMedicalRecord',
    component: PatientStep,
    validate: (s) => !!s.patientProfile,
  },
  {
    titleKey: 'stepTitles.selectAddonServices',
    component: ServiceStep,
    validate: () => true,
  },
  {
    titleKey: 'stepTitles.reviewConfirm',
    component: ReviewStep,
    validate: (s) =>
      (!!s.paymentMethod && s.feeInfo.totalAmount > 0) ||
      s.feeInfo.totalAmount === 0,
  },
]

export const BOOKING_STEPS_DOCTOR: BookingStepConfig[] = [
  {
    titleKey: 'stepTitles.selectLocation',
    component: () => LocationStep({ type: 'DOCTOR' }),
    validate: (s) => !!s.branch,
  },
  {
    titleKey: 'stepTitles.selectSchedule',
    component: ScheduleStep,
    validate: (s) => !!s.appointmentDate && !!s.startTime && !!s.endTime,
  },
  {
    titleKey: 'stepTitles.selectPatientMedicalRecord',
    component: PatientStep,
    validate: (s) => !!s.patientProfile,
  },
  {
    titleKey: 'stepTitles.selectAddonServices',
    component: ServiceStep,
    validate: () => true,
  },
  {
    titleKey: 'stepTitles.reviewConfirm',
    component: ReviewStep,
    validate: (s) =>
      (!!s.paymentMethod && s.feeInfo.totalAmount > 0) ||
      s.feeInfo.totalAmount === 0,
  },
]

export const BOOKING_STEPS_PACKAGE: BookingStepConfig[] = [
  {
    titleKey: 'stepTitles.selectLocation',
    component: () => LocationStep({ type: 'PACKAGE' }),
    validate: (s) => !!s.branch,
  },
  {
    titleKey: 'stepTitles.selectSchedule',
    component: ScheduleStep,
    validate: (s) => !!s.appointmentDate && !!s.startTime && !!s.endTime,
  },
  {
    titleKey: 'stepTitles.selectPatientMedicalRecord',
    component: PatientStep,
    validate: (s) => !!s.patientProfile,
  },
  {
    titleKey: 'stepTitles.selectAddonServices',
    component: ServiceStep,
    validate: () => true,
  },
  {
    titleKey: 'stepTitles.reviewConfirm',
    component: ReviewStep,
    validate: (s) =>
      (!!s.paymentMethod && s.feeInfo.totalAmount > 0) ||
      s.feeInfo.totalAmount === 0,
  },
]
