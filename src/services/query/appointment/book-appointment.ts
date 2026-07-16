import { useMutation, type UseMutationOptions } from '#/hooks/use-mutation'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

/** CR-02: 1 phòng khách sạn (hotel data_type=02). */
export interface BookAppointmentAddonRoom {
  checkInDate: string
  checkOutDate: string
}

/** CR-01/CR-02: 1 add-on đã chọn trong payload đặt lịch. */
export interface BookAppointmentAddon {
  addonServiceTypeId: number
  /** số vé xe / số combo / tổng số đêm hotel */
  quantity: number
  /** 1 = một chiều, 2 = khứ hồi (xe 01 & 05) */
  tripType: 1 | 2
  /** bắt buộc nếu là hotel (02) */
  rooms?: BookAppointmentAddonRoom[]
}

export interface BookAppointmentRequest {
  branchId: number
  doctorId?: number
  specialtyId?: number
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
  roomId?: number
  /** CR-01/CR-02: thay cho mảng ID cũ. */
  addons?: BookAppointmentAddon[]
  /** CR-02: true nếu KH đang thấy banner promo → báo BE chốt suất Free. */
  expectedPromo?: boolean
  pickupTime?: string
  pickupAddress?: string
  pickupNote?: string
}

/** Điều chỉnh theo response thực tế của API. */
export interface BookAppointmentResponse {
  bookingToken: string
  appointmentCode: string
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
