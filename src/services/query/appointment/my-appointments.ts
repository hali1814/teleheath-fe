import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW'

export interface MyAppointmentsRequest {
  status?: AppointmentStatus
}

interface AppointmentHospital {
  hospitalId: string
  nameVi: string
  nameEn: string
  address: string
}

interface AppointmentBranch {
  branchId: string
  nameVi: string
  nameEn: string
  address: string
}

interface AppointmentDoctor {
  doctorId: string
  nameVi: string
  nameEn: string
  avatarUrl: string
}

interface AppointmentBookedFor {
  id: number
  name: string
  phone: string
  relationship: string
}

interface AppointmentSpecialty {
  id: number
  name: string
}

interface AppointmentMedicalPackage {
  id: number
  name: string
  price: number
}

interface AppointmentPayment {
  id: string
  status: string
  transactionId: string
}

interface AppointmentMedicalFile {
  fileId: string
  originalFilename: string
  remotePath: string
  contentType: string
  sizeBytes: number
}

interface AppointmentService {
  id: number
  name: string
  price: number
}

interface AppointmentConsultationTier {
  id: number
  code: string
  nameVi: string
  nameEn: string
  surchargeAmount: number
}

export interface MyAppointmentItem {
  id: number
  bookingType?: 'HOSPITAL' | 'PACKAGE' | 'DOCTOR'
  status: AppointmentStatus | string
  hospital: AppointmentHospital | null
  branch: AppointmentBranch | null
  doctor: AppointmentDoctor | null
  bookedFor: AppointmentBookedFor | null
  specialty: AppointmentSpecialty | null
  medicalPackage: AppointmentMedicalPackage | null
  appointmentDate: string
  startTime: string
  endTime: string
  patientName: string
  patientPhone: string
  patientDob: string
  patientGender: string
  notes: string | null
  medicalHistory: string | null
  rejectReason: string | null
  totalAmount: number
  createdAt: string
  confirmedAt: string | null
  payment: AppointmentPayment | null
  medicalFiles: AppointmentMedicalFile[]
  services: AppointmentService[]
  serviceFee: number
  consultationTier: AppointmentConsultationTier | null
}

const getMyAppointments = async (
  params: MyAppointmentsRequest,
  signal: AbortSignal,
) => {
  return http.get<MyAppointmentItem[]>('/appointments', params, {
    signal,
  })
}

export const useGetMyAppointmentsQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<MyAppointmentItem[]>,
    MyAppointmentsRequest
  >,
) => {
  return useQuery({
    queryKey: ['my-appointments', options.params],
    queryFn: ({ signal }) => getMyAppointments(options.params, signal),
    ...options,
  })
}
