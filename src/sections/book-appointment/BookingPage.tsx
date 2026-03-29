import { useBookAppointmentMutation } from '#/services/query/appointment/book-appointment'
import { useGetDoctorDetailQuery } from '#/services/query/doctor/doctor-detail'
import { useGetPackageDetailQuery } from '#/services/query/package/package-detail'
import type { HttpCommonResponse } from '#/services/network/http-request'
import { useBookingStore } from '#/stores/booking-store'
import type { Doctor } from '#/types/doctor'
import type { Hospital } from '#/types/hospital'
import type { Package } from '#/types/package'
import { useNavigate } from '@tanstack/react-router'
import { useCallback } from 'react'
import type { BookingRouteContext } from './booking-context'
import type { BookingStepConfig } from './booking-steps'
import { StepLayout } from './StepLayout'
import { useGetHospitalDetailQuery } from '#/services/query/hospital/hospital-detail'
import { DATE_TIME_TYPE, formatDate } from '#/utils'

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
      if (!data.id) return
      if (store.feeInfo.totalAmount === 0) {
        navigate({
          to: '/app/book-appointment/success/$appointmentId',
          params: { appointmentId: data.id },
        })
        return
      }
      navigate({
        to: '/app/payment/khqr/$appointmentId',
        params: { appointmentId: data.id },
      })
    },
  })

  const handleSubmit = () => {
    if (
      !store.branch?.branchId ||
      !store.branch.hospitalId ||
      !store.patientProfile?.id ||
      !store.appointmentDate ||
      !store.startTime ||
      !store.endTime
    )
      return

    const bookingType =
      context.flow === 'HOSPITAL'
        ? 'HOSPITAL'
        : context.flow === 'DOCTOR'
          ? 'DOCTOR'
          : 'PACKAGE'

    const doctorId = store.doctor?.doctorId ?? ''

    const packageId =
      context.flow === 'PACKAGE' && packageParam
        ? Number(packageParam)
        : undefined

    bookAppointment({
      branchId: store.branch.branchId,
      doctorId,
      specialtyId: store.specialty?.id ?? 1,
      packageId,
      bookingType,
      patientProfileId: store.patientProfile.id,
      appointmentDate: formatDate(
        store.appointmentDate,
        DATE_TIME_TYPE.YYYY_MM_DD,
      ),
      startTime: store.startTime,
      endTime: store.endTime,
      notes: store.notes,
      medicalHistory: store.medicalHistory,
      serviceIds: store.serviceIds,
      medicalFileIds: store.medicalFiles
        .filter((x) => x.status === 'success')
        .map((x) => x.fileId)
        .filter((x) => x !== undefined),
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
