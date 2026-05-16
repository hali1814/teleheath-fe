import { useInfiniteQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import type { IPagingRequest, IPagingResponse } from '#/model/paging.model'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export type AppointmentStatus =
  | 'PENDING'
  | 'WAITING_CONFIRM'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'NO_SHOW'

export interface MyAppointmentsRequest extends IPagingRequest {
  status?: string
  fromDate?: string
  toDate?: string
}

interface AppointmentHospital {
  hospitalId: string
  name: string
  nameVi: string
  nameEn: string
  address: string
  nameKh: string
}

interface AppointmentBranch {
  branchId: string
  nameVi: string
  nameEn: string
  province: string
  address: string
  nameKh: string
  googleMapsEmbed: string
}

interface AppointmentDoctor {
  doctorId: number
  name: string
  nameVi: string
  nameKh: string
  nameEn: string
  avatarUrl: string
  specialties: {
    id: number
    name: string
    nameVi: string
    nameKh: string
    nameEn: string
    iconUrl: string
  }[]
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
  iconUrl: string
}

interface AppointmentMedicalPackage {
  id: number
  name: string
  price: number
}

interface AppointmentPayment {
  id: string
  status: string
  method: string
  refId: string
  amount: number
  currency: string
  transactionId: string
  transFee: number
  transAmount: number
  transTotalAmount: number
  paidAt: string
  createdAt: string
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
  nameVi?: string
  nameKh?: string
  nameEn?: string
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
  cancellationReason: string | null
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
  consultationFee: number
  thumbnailUrl: string
}

interface MyAppointmentsResponse extends IPagingResponse<MyAppointmentItem> {}

const getMyAppointments = async (
  params: MyAppointmentsRequest,
  signal: AbortSignal,
) => {
  return http.get<MyAppointmentsResponse>('/appointments', params, {
    signal,
  })
}

export const useGetMyAppointmentsQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<MyAppointmentsResponse>,
    MyAppointmentsRequest
  >,
) => {
  return useQuery({
    queryKey: ['my-appointments', options.params],
    queryFn: ({ signal }) => getMyAppointments(options.params, signal),
    ...options,
  })
}

export type MyAppointmentsInfiniteParams = Omit<
  MyAppointmentsRequest,
  'page'
> & {
  size?: number
}

export const useGetMyAppointmentsInfiniteQuery = ({
  params,
  enabled,
  staleTime,
}: {
  params: MyAppointmentsInfiniteParams
  enabled?: boolean
  staleTime?: number
}) => {
  const { i18n } = useTranslation()
  const size = params.size ?? 10

  return useInfiniteQuery({
    queryKey: ['my-appointments-infinite', { ...params, size }, i18n.language],
    queryFn: ({ pageParam = 0, signal }) =>
      getMyAppointments(
        {
          page: pageParam,
          size,
          status: params.status,
          fromDate: params.fromDate,
          toDate: params.toDate,
          sortBy: params.sortBy,
          sortDir: params.sortDir,
        },
        signal,
      ),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const pageInfo = lastPage?.data
      if (!pageInfo || pageInfo.last) return undefined
      return pageInfo.page + 1
    },
    enabled,
    staleTime,
  })
}
