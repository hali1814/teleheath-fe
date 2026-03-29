import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http, type HttpCommonResponse } from '#/services/network/http-request'

interface SuggestionRequest {
  keyword: string
  specialtyId?: string
}

export interface SuggestionItem {
  type: string
  text: string
  id: string
}

/** Payload trong `HttpCommonResponse.data` từ GET /search/suggestions */
export interface SuggestionListPayload {
  suggestions: SuggestionItem[]
}

const getSuggestion = async (
  params: SuggestionRequest,
  signal: AbortSignal,
) => {
  const response = await http.get<SuggestionListPayload>(
    `/search/suggestions`,
    params,
    {
      signal,
    },
  )
  return response
}

export const useGetSuggestionQuery = (
  options: UseQueryOptions<
    HttpCommonResponse<SuggestionListPayload>,
    SuggestionRequest
  >,
) => {
  return useQuery({
    queryKey: ['suggestion', options.params],
    queryFn: ({ signal }) => getSuggestion(options.params, signal),
    ...options,
  })
}
