export interface ApiResponse<T> {
  isSuccess: boolean;
  errors?: string[];
  message?: string[];
  data?: T | T[];
  meta?: MetaType;
}

export interface MetaType {
  totalItems: number;
  // For cursor based pagination
  nextCursor?: string;
  hasNext?: boolean;
}
export interface OffsetPaginatedRequest {
  offset?: number;
  limit: number;
  filters?: any;
  sortings?: any;
  searchKey?: string;
}
