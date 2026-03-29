import { useMutation, type UseMutationOptions } from '#/hooks/use-mutation'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

export interface BookAppointmentRequest {
  branchId: string
  doctorId: string
  specialtyId: number
  packageId?: number
  appointmentDate: string
  startTime: string
  endTime: string
  bookingType: 'HOSPITAL' | 'PACKAGE' | 'DOCTOR'
  patientProfileId: number
  notes?: string
  medicalHistory?: string
  serviceIds?: number[]
  medicalFileIds?: string[]
  thumbnailUrl?: string
}

/** Điều chỉnh theo response thực tế của API. */
export interface BookAppointmentResponse {
  id: string
}

export const bookAppointment = async (
  request: BookAppointmentRequest,
  signal: AbortSignal,
) => {
  return http.post<BookAppointmentResponse>('/appointments', request, {
    signal,
  })
}

export const useBookAppointmentMutation = (
  options: UseMutationOptions<
    HttpCommonResponse<BookAppointmentResponse>,
    BookAppointmentRequest
  >,
) => {
  return useMutation({
    mutationFn: bookAppointment,
    ...options,
  })
}
