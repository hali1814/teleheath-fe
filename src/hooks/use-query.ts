/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type QueryKey,
  useQueryClient,
  type UseQueryOptions as UseQueryOptionsRQ,
  useQuery as useQueryRQ,
} from '@tanstack/react-query'
import { useCallback, useEffect, useRef } from 'react'
// import { showToast } from '@shared/utils'
import { AxiosError } from 'axios'

/**
 * -------------------------------------------------------------------------
 * useQuery (wrapper)
 * -------------------------------------------------------------------------
 *  Mục tiêu:
 *   1. Giữ API gốc của TanStack React Query v5 – hoàn toàn type-safe.
 *   2. Thêm logic huỷ request (`abortQuery`).
 *   3. Tuỳ chọn hiển thị toast khi lỗi (`isShowError`).
 *   4. Cho phép truyền `params` tuỳ ý (không forward xuống TanStack).
 *
 *  @typeParam TResponse     Dữ liệu trả về từ server (Response DTO).
 *  @typeParam TTransformed  Dữ liệu sau khi biến đổi (qua `select`).
 *                           Mặc định = `TResponse`.
 *  @typeParam TRequest       Kiểu của object `params` – do caller định nghĩa.
 * -------------------------------------------------------------------------
 */

type QueryError =
  | AxiosError<unknown, any>
  | {
      name?: 'AxiosError'
      message: string
    }

/**
 * Base option mở rộng thêm thuộc tính custom cho wrapper.
 */
type UseQueryOpts<TResponse, TTransformed, TRequest> = UseQueryOptionsRQ<
  TResponse,
  QueryError,
  TTransformed,
  QueryKey
> & {
  /** Optional params for queryFn or building queryKey */
  params: TRequest
  /** Show error toast automatically (default: true) */
  isShowError?: boolean
  /** onSuccess callback (same signature as TanStack) */
  onSuccess?: (data: TTransformed) => void
  /** onError callback (same signature as TanStack) */
  onError?: (error: QueryError) => void
  /** onSettled callback (same signature as TanStack) */
  onSettled?: (data: TTransformed | undefined, error: QueryError | null) => void
}

/**
 * Public option dành cho caller – đã loại bỏ `queryKey` để buộc khai báo.
 */
export type UseQueryOptions<
  TResponse,
  TRequest = void,
  TTransformed = TResponse,
> = Omit<UseQueryOpts<TResponse, TTransformed, TRequest>, 'queryKey'>

export const useQuery = <TResponse, TTransformed = TResponse, TRequest = void>({
  isShowError = true,
  onSuccess,
  onError,
  onSettled,
  ...otherOpts
}: UseQueryOpts<TResponse, TTransformed, TRequest>) => {
  // ---------------------------------------------------------------------
  // Local helpers
  // ---------------------------------------------------------------------
  const queryClient = useQueryClient()
  const queryKeyRef = useRef<QueryKey>(otherOpts.queryKey)

  // Exclude callback props before passing to TanStack useQuery
  const tanstackOptions = otherOpts as Omit<
    typeof otherOpts,
    'onSuccess' | 'onError' | 'onSettled' | 'params' | 'isShowError'
  >

  const queryResult = useQueryRQ<TResponse, QueryError, TTransformed>({
    ...tanstackOptions,
  })

  // Trigger callbacks and error toast via side-effects
  useEffect(() => {
    if (queryResult.fetchStatus === 'idle') {
      if (queryResult.isSuccess) {
        onSuccess?.(queryResult.data as TTransformed)
        onSettled?.(queryResult.data as TTransformed, null)
      }
      if (queryResult.isError) {
        const errorObj = queryResult.error as QueryError
        onError?.(errorObj)
        if (isShowError) {
          // showToast.error('Lỗi', errorObj?.message ?? 'Có lỗi xảy ra')
        }
        onSettled?.(undefined, errorObj)
      }
    }
  }, [
    queryResult.isSuccess,
    queryResult.isError,
    queryResult.fetchStatus,
    queryResult.data,
    queryResult.error,
    onSuccess,
    onSettled,
    onError,
    isShowError,
  ])

  // Public abort helper – allow caller to cancel query manually
  const abortQuery = useCallback(() => {
    queryClient.cancelQueries({ queryKey: queryKeyRef.current })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ...queryResult, abortQuery }
}
