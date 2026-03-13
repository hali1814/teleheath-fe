/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  type QueryKey,
  type UseMutationOptions as UseMutationOptionsRQ,
  useMutation as useMutationRQ,
  useQueryClient,
} from '@tanstack/react-query'
import { useCallback, useRef } from 'react'
import { type HttpCommonResponse } from '@/services/network/http-request'
import { AxiosError } from 'axios'

/**
 * -------------------------------------------------------------------------
 * useMutation (wrapper)
 * -------------------------------------------------------------------------
 *  Mục tiêu tương tự useQuery nhưng dành cho mutation:
 *   1. Giữ API gốc TanStack React Query v5.
 *   2. Thêm khả năng huỷ request (`abortMutation`).
 *   3. Tuỳ chọn toast lỗi (`isShowError`).
 *
 *  @typeParam TResponse   Kiểu dữ liệu trả về sau mutation.
 *  @typeParam TRequest    Kiểu biến/param gửi lên server.
 *  @typeParam TError      Kiểu lỗi (mặc định: MutationError).
 *  @typeParam TContext    Context – giống TanStack (mặc định: void).
 * -------------------------------------------------------------------------
 */

type MutationError =
  | AxiosError<unknown, any>
  | {
      name?: 'AxiosError'
      message: string
    }

type UseMutationOpts<TResponse, TRequest, TError, TContext> = {
  /** Bật / tắt toast error mặc định – true */
  isShowError?: boolean
  /** Hàm thực thi mutation – đã inject `signal` để abort */
  mutationFn: (variables: TRequest, signal: AbortSignal) => Promise<TResponse>
  /**
   * Danh sách QueryKey cần invalidates sau khi mutation thành công.
   * Làm mới cache thay vì gọi thủ công ở component.
   */
  invalidateQueries?: QueryKey[]
} & Omit<
  UseMutationOptionsRQ<TResponse, TError, TRequest, TContext>,
  'mutationFn'
>

export type UseMutationOptions<
  TResponse,
  TRequest,
  TError = MutationError,
  TContext = unknown,
> = Omit<UseMutationOpts<TResponse, TRequest, TError, TContext>, 'mutationFn'>

export const useMutation = <
  TResponse,
  TRequest = void,
  TError = MutationError,
  TContext = unknown,
>({
  mutationFn,
  isShowError = true,
  invalidateQueries,
  onError: userOnError,
  onSuccess: userOnSuccess,
  ...options
}: UseMutationOpts<TResponse, TRequest, TError, TContext>) => {
  // ---------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------
  const controllerRef = useRef<AbortController | null>(null)
  const queryClient = useQueryClient()

  const mutationResult = useMutationRQ<TResponse, TError, TRequest, TContext>({
    mutationFn: async (variables) => {
      if (!controllerRef.current) {
        controllerRef.current = new AbortController()
      }
      const { signal } = controllerRef.current

      try {
        const response = await mutationFn(variables, signal)
        if (
          !(response as HttpCommonResponse<TResponse>).success &&
          isShowError
        ) {
          // toastService.error(
          //   (response as HttpCommonResponse<TResponse>).message
          // );
        }
        return response
      } catch (error) {
        if (signal.aborted) {
          // throw new Error("Mutation was aborted");
        }
        throw error
      }
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      // Cache invalidation
      if (invalidateQueries?.length) {
        for (const key of invalidateQueries) {
          queryClient.invalidateQueries({ queryKey: key })
        }
      }
      userOnSuccess?.(data, variables, onMutateResult, context)
    },
    onError: (error, variables, onMutateResult, context) => {
      if (isShowError) {
        // showToast.error('Lỗi', (error as Error)?.message ?? 'Có lỗi xảy ra')
      }
      userOnError?.(error, variables, onMutateResult, context)
    },
    ...options,
  })

  const abortMutation = useCallback(() => {
    controllerRef.current?.abort()
    controllerRef.current = null
  }, [])

  return { ...mutationResult, abortMutation }
}
