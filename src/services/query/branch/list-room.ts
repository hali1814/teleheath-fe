import { useQuery, type UseQueryOptions } from '#/hooks/use-query'
import { http } from '#/services/network/http-request'

export interface Room {
  id: number
  roomCode: string
  name: string
  specialtyId: number
}

interface ListRoomRequest {
  branchId: string
  specialtyId?: number
}

const getListRoom = async (params: ListRoomRequest, signal: AbortSignal) => {
  const response = await http.get<Room[]>(
    `/branches/${params.branchId}/rooms`,
    {
      specialtyId: params.specialtyId,
    },
    {
      signal,
    },
  )
  return response.data
}

export const useGetListRoomQuery = (
  options: UseQueryOptions<Room[], ListRoomRequest>,
) => {
  return useQuery({
    queryKey: ['list-room', options.params],
    queryFn: ({ signal }) => getListRoom(options.params, signal),
    ...options,
  })
}
