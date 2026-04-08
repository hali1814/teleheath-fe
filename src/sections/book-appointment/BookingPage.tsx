import { useBookAppointmentMutation } from '#/services/query/appointment/book-appointment'
import { useGetDoctorDetailQuery } from '#/services/query/doctor/doctor-detail'
import { useGetPackageDetailQuery } from '#/services/query/package/package-detail'
import type { HttpCommonResponse } from '#/services/network/http-request'
import { useBookingStore } from '#/stores/booking-store'
import type { Doctor } from '#/types/doctor'
import type { Package } from '#/types/package'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import type { BookingRouteContext } from './booking-context'
import type { BookingStepConfig } from './booking-steps'
import { StepLayout } from './StepLayout'
import { useGetHospitalDetailQuery } from '#/services/query/hospital/hospital-detail'
import { DATE_TIME_TYPE, formatDate } from '#/utils'
import type { Hospital } from '#/entities/hospitalEntity'

export default function BookingPage({
  steps,
  context,
}: {
  steps: BookingStepConfig[]
  context: BookingRouteContext
}) {
  const navigate = useNavigate()
  const store = useBookingStore()
  const setData = useBookingStore((s) => s.setData)
  const current = steps[store.step]

  const StepComponent = current.component

  const isHospital = context.flow === 'HOSPITAL'
  const isDoctor = context.flow === 'DOCTOR'
  const isPackage = context.flow === 'PACKAGE'
  const hospitalParam = isHospital ? context.hospitalId : undefined
  const doctorParam = isDoctor ? context.doctorId : undefined
  const packageParam = isPackage ? context.packageId : undefined

  const onDoctorDetailSuccess = useCallback(
    (res: HttpCommonResponse<Doctor>) => {
      setData({
        bookingType: 'DOCTOR',
        doctor: res.data,
        thumbnailUrl: res.data?.avatarUrl,
      })
    },
    [setData],
  )

  const onHospitalDetailSuccess = useCallback(
    (res: HttpCommonResponse<Hospital>) => {
      setData({
        bookingType: 'HOSPITAL',
        hospital: res.data,
        thumbnailUrl: res.data?.logoUrl,
      })
    },
    [setData],
  )

  const onPackageDetailSuccess = useCallback(
    (res: HttpCommonResponse<Package>) => {
      setData({
        bookingType: 'PACKAGE',
        packageData: res.data,
        thumbnailUrl: res.data?.imageUrl,
      })
    },
    [setData],
  )

  useGetHospitalDetailQuery({
    params: { hospitalId: hospitalParam ?? '' },
    enabled: isHospital && !!hospitalParam,
    onSuccess: onHospitalDetailSuccess,
  })

  useGetDoctorDetailQuery({
    params: { doctorId: doctorParam ?? '' },
    enabled: isDoctor && !!doctorParam,
    onSuccess: onDoctorDetailSuccess,
  })

  useGetPackageDetailQuery({
    params: { packageId: Number(packageParam) ?? 0 },
    enabled: isPackage && !!packageParam,
    onSuccess: onPackageDetailSuccess,
  })

  const { mutate: bookAppointment } = useBookAppointmentMutation({
    onSuccess: ({ data }) => {
      if (!data.bookingToken) return
      if (store.feeInfo.totalAmount === 0) {
        navigate({
          to: '/app/book-appointment/success/$appointmentCode',
          params: { appointmentCode: data.appointmentCode },
        })
        return
      }
      navigate({
        to: '/app/payment/khqr/$bookingToken',
        params: { bookingToken: data.bookingToken },
      })
    },
  })

  const handleSubmit = () => {
    let bookingType: 'HOSPITAL' | 'DOCTOR' | 'PACKAGE' = 'HOSPITAL'
    switch (context.flow) {
      case 'HOSPITAL':
        bookingType = 'HOSPITAL'
        if (
          !store.hospital?.hospitalId ||
          !store.specialty?.id ||
          !store.branch?.branchId ||
          !store.room?.id ||
          !store.doctor?.doctorId ||
          !store.patientProfile?.id ||
          !store.appointmentDate ||
          !store.startTime ||
          !store.endTime
        )
          return
        break
      case 'DOCTOR':
        bookingType = 'DOCTOR'
        if (
          !store.doctor?.doctorId ||
          !store.branch?.branchId ||
          !store.patientProfile?.id ||
          !store.appointmentDate ||
          !store.startTime ||
          !store.endTime
        )
          return
        break
      case 'PACKAGE':
        bookingType = 'PACKAGE'
        if (
          !store.packageData?.id ||
          !store.branch?.branchId ||
          !store.patientProfile?.id ||
          !store.appointmentDate ||
          !store.startTime ||
          !store.endTime
        )
          return
        break
    }

    bookAppointment({
      branchId: store.branch.branchId,
      roomId: store.room?.id,
      doctorId: store.doctor?.doctorId,
      specialtyId: store.specialty?.id,
      packageId: store.packageData?.id,
      appointmentDate: formatDate(
        store.appointmentDate,
        DATE_TIME_TYPE.YYYY_MM_DD,
      ),
      startTime: store.startTime,
      endTime: store.endTime,
      bookingType,
      patientProfileId: store.patientProfile.id,
      thumbnailUrl: store.thumbnailUrl,
      notes: store.notes,
      medicalHistory: store.medicalHistory,
      medicalFileIds: store.medicalFiles
        .filter((x) => x.status === 'success')
        .map((x) => x.fileId)
        .filter((x) => x !== undefined),
      serviceIds: store.serviceIds,
      addonServiceTypeIds: store.addonServiceTypes?.map((x) => x.id),
      pickupTime: store.pickupTime,
      pickupDate: store.pickupDate,
      pickupNote: store.pickupNote,
    })
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
