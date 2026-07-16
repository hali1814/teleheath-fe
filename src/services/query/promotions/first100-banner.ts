import { useTranslation } from 'react-i18next'

import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

/**
 * CR-02 §3.10 — Banner "First-time customer offer" (100 KH đầu tiên).
 * Trạng thái GLOBAL (không phụ thuộc user). Field theo snake_case đúng doc BE.
 */
export interface First100Banner {
  promo_code: string
  /** App chỉ render banner khi = true. */
  show_banner: boolean
  status: 'ACTIVE' | 'ENDED'
  limit: number
  used: number
  remaining: number
  discount_percent: number
  /** Text theo Accept-Language (en|vi|km). */
  title: string
  description: string
}

const getFirst100Banner = async (lang: string, signal: AbortSignal) => {
  return http.get<First100Banner>('/promotions/first100/banner', undefined, {
    signal,
    headers: { 'Accept-Language': lang },
  })
}

/**
 * Gọi ở màn Select add-on (quyết định render banner) và check chéo ở Review.
 * Fail-safe: lỗi (401/500) → coi như không có banner (caller check `show_banner`).
 * Cache mặc định 30s; khi `remaining ≤ 5` nên truyền `staleTime: 0` để tắt banner kịp (CR §3.10).
 */
export const useGetFirst100BannerQuery = (
  options?: Partial<
    UseQueryOptions<HttpCommonResponse<First100Banner>, void>
  >,
) => {
  const { i18n } = useTranslation()

  return useQuery<HttpCommonResponse<First100Banner>, HttpCommonResponse<First100Banner>, void>({
    queryKey: ['first100-banner'],
    params: undefined as void,
    queryFn: ({ signal }) => getFirst100Banner(i18n.language, signal),
    staleTime: 30_000,
    isShowError: false,
    ...options,
  })
}
