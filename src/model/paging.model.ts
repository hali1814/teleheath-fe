export interface IPagingRequest {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

// export interface IPagingResponse<T> {
//   data: T[];
//   total: number;
//   page: number;
//   limit: number;
// }
