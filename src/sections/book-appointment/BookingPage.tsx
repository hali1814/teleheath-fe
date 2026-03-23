import { useBookAppointmentMutation } from '#/services/query/appointment/book-appointment'
import { useGetDoctorDetailQuery } from '#/services/query/doctor/doctor-detail'
import { useGetPackageDetailQuery } from '#/services/query/package/package-detail'
import { useBookingStore } from '#/stores/booking-store'
import { useNavigate } from '@tanstack/react-router'
import { useEffect } from 'react'
import type { BookingRouteContext } from './booking-context'
import type { BookingStepConfig } from './booking-steps'
import { StepLayout } from './StepLayout'

const DEFAULT_DOCTOR_ID = '33333333-0000-0000-0000-000000000001'
const DEFAULT_HOSPITAL_ID = '11111111-0000-0000-0000-000000000001'

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

  const doctorQuery = useGetDoctorDetailQuery({
    params: { doctorId: doctorParam ?? '' },
    enabled: isDoctor && !!doctorParam,
  })

  const packageQuery = useGetPackageDetailQuery({
    params: { packageId: packageParam ?? '' },
    enabled: isPackage && !!packageParam,
  })

  useEffect(() => {
    if (!isHospital || !hospitalParam) return
    setData({
      bookingType: 'HOSPITAL',
      hospitalId: hospitalParam ?? '',
    })
  }, [isHospital, hospitalParam, setData])

  useEffect(() => {
    if (!isDoctor || !doctorParam) return
    const doc = doctorQuery.data?.data
    if (!doc) return
    setData({
      bookingType: 'DOCTOR',
      doctor: doctorParam,
      hospitalId: doc.hospitalId,
    })
  }, [isDoctor, doctorParam, doctorQuery.data?.data, setData])

  useEffect(() => {
    if (!isPackage || !packageParam) return
    const pkg = packageQuery.data?.data
    if (!pkg) return
    // const firstHospital = pkg.hospitals?.[0]
    setData({
      bookingType: 'PACKAGE',
      package: pkg,
      hospitalId: DEFAULT_HOSPITAL_ID,
    })
  }, [isPackage, packageParam, packageQuery.data?.data, setData])

  const { mutate: bookAppointment } = useBookAppointmentMutation({
    onSuccess: ({ data }) => {
      if (!data?.id) return
      store.reset()
      navigate({
        to: '/app/payment/khqr/$appointmentId',
        params: { appointmentId: data?.id },
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

    const doctorId =
      context.flow === 'DOCTOR' && doctorParam
        ? doctorParam
        : (store.doctor ?? DEFAULT_DOCTOR_ID)

    const packageId =
      context.flow === 'PACKAGE' && packageParam
        ? Number(packageParam)
        : undefined

    bookAppointment({
      hospitalId: store.branch.hospitalId,
      branchId: store.branch.branchId,
      consultationTierId: store.consultationTier?.id ?? 1,
      doctorId,
      specialtyId: store.specialty?.id ?? 1,
      packageId,
      bookingType,
      patientProfileId: store.patientProfile.id,
      appointmentDate: store.appointmentDate,
      startTime: store.startTime,
      endTime: store.endTime,
      notes: store.notes,
      medicalHistory: store.medicalHistory,
      serviceIds: store.serviceIds,
      medicalFiles: store.medicalFiles,
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
