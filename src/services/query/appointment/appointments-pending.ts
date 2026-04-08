import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export interface PendingAppointmentRequest {
  bookingToken: string
}

interface PendingAppointmentDoctor {
  doctorId: number
  nameVi: string
  nameKh: string
  nameEn: string
  avatarUrl: string
}

interface PendingAppointmentBranch {
  branchId: number
  nameVi: string
  nameEn: string
  address: string
}

interface PendingAppointmentRoom {
  roomId: number
  roomCode: string
  name: string
  specialtyId: number
}

interface PendingAddonService {
  serviceTypeId: number
  partnerName: string
  typeName: string
  price: number
}

export interface PendingAppointmentResponse {
  bookingToken: string
  bookingType: 'HOSPITAL' | 'DOCTOR' | 'PACKAGE' | string
  expiresAt: string
  patientName: string
  patientPhone: string
  patientDob: string
  patientGender: string
  appointmentDate: string
  startTime: string
  endTime: string
  hospitalId: number
  hospitalName: string
  branchId: number
  branchName: string
  branchAddress: string
  doctorId: number
  doctorName: string
  doctorPhotoUrl: string
  roomId: number
  roomName: string
  roomCode: string
  packageId: number
  packageName: string
  specialtyId: number
  specialtyName: string
  totalAmount: number
  paymentMethod: string
  addonServices: PendingAddonService[]
  doctor?: PendingAppointmentDoctor
  branch?: PendingAppointmentBranch
  room?: PendingAppointmentRoom
}

const getPendingAppointment = async (
  params: PendingAppointmentRequest,
  signal: AbortSignal,
) => {
  return http.get<PendingAppointmentResponse>(
    `/appointments/pending/${params.bookingToken}`,
    {},
    { signal },
  )
}

export const useGetPendingAppointmentQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<PendingAppointmentResponse>,
    PendingAppointmentRequest
  >,
) => {
  return useQuery({
    queryKey: ['appointments-pending', options.params],
    queryFn: ({ signal }) => getPendingAppointment(options.params, signal),
    ...options,
  })
}
