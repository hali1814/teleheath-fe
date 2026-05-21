import { http, type HttpCommonResponse } from '#/services/network/http-request'

export type PaymentResumeStatus = 'PENDING' | 'SUCCESS'

export interface PaymentResumeResponse {
  status: PaymentResumeStatus
  refId: string
  bookingToken?: string | null
  appointmentCode?: string | null
  createdAt?: string | null
  paidAt?: string | null
}

/**
 * Trả về giao dịch gần nhất của user để FE khôi phục đúng màn hình thanh toán
 * khi WebView bị OS thu hồi và app được mở lại từ partner.
 *
 * Response `data` có thể là `null` khi không có giao dịch cần resume.
 */
export const getPaymentResume = async () => {
  const response = await http.get<PaymentResumeResponse | null>(
    '/payments/resume',
  )
  return response as HttpCommonResponse<PaymentResumeResponse | null>
}
