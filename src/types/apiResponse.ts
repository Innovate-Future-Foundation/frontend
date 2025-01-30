export interface ApiResponse<T> {
  isSuccess: boolean;
  errors?: string[];
  message?: string[];
  data?: T | T[];
  meta?: MetaType;
}

export interface MetaType {
  pageSize: number;
  totalItems: number;
  // For off-set based pagination
  currentPage?: number;
  totalPages?: number;
  // For cursor based pagination
  nextCursor?: string;
  hasNextPage?: boolean;
}
