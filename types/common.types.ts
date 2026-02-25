export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type ApprovalStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export type ActiveStatus = 'ACTIVE' | 'INACTIVE';

export interface PaginationParams {
  page: number;
  pageSize: number;
  total: number;
}

export interface SortParams {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterParams {
  search?: string;
  status?: string;
  department?: string;
  dateFrom?: string;
  dateTo?: string;
}

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface SelectOption {
  label: string;
  value: string;
}
