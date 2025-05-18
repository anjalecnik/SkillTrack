export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    from: number;
    to: number;
  };
}
