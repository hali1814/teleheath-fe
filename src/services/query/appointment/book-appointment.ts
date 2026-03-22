import { useMutation, type UseMutationOptions } from '#/hooks/use-mutation'
import { http, type HttpCommonResponse } from '#/services/network/http-request'
import type { BookingState } from '#/stores/booking-store'

/** Toàn bộ field dữ liệu booking (không gồm action của zustand). */
export type BookAppointmentRequest = Omit<
  BookingState,
  'setStep' | 'next' | 'back' | 'setData' | 'appendFileId' | 'removeFileId'
>

/** Điền body POST — lọc bỏ method khỏi state store. */
export function bookingStateToRequest(
  state: BookingState,
): BookAppointmentRequest {
  const {
    setStep: _setStep,
    next: _next,
    back: _back,
    setData: _setData,
    appendFileId: _appendFileId,
    removeFileId: _removeFileId,
    ...payload
  } = state
  return payload
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
