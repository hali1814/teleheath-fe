import { http, type HttpCommonResponse } from '#/services/network/http-request'

export interface PaymentResumeResponse {
  status: 'PENDING'
  refId: string
  bookingToken: string
  createdAt?: string | null
}

/**
 * Trả về giao dịch đang đợi thanh toán (PENDING + QR còn hạn) để FE khôi phục
 * màn QR khi WebView bị OS thu hồi giữa flow. BE đảm bảo: nếu user không còn
 * đợi thanh toán, response `data` = null → FE giữ điều hướng mặc định.
 */
export const getPaymentResume = async () => {
  const response = await http.get<PaymentResumeResponse | null>(
    '/payments/resume',
  )
  return response as HttpCommonResponse<PaymentResumeResponse | null>
}
