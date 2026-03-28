export interface IPagingRequest {
  page: number
  size: number
  sortBy?: string
  sortDir?: 'ASC' | 'DESC'
}

export interface IPagingResponse<T> {
  content: T[]
  page: number
  size: number
  totalElements: number
  totalPages: number
  last: boolean
}
