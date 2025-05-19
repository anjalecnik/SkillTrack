export interface HalPaginatedResponse<T> {
  _embedded: T;
  total: number;
  page: number;
  from: number;
  to: number;
}
