// Core domain types
export interface User {
  id: string;
  email: string;
  name: string;
  is_active: boolean;
  is_verified: boolean;
  created_at: string;
  last_login?: string;
  preferred_language?: string;
  preferred_level?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
}

export interface DashboardMetrics {
  total_users: number;
  active_users: number;
  verified_users: number;
  total_conversations: number;
  total_assessments: number;
  total_learning_plans: number;
}

export interface ApiResponse<T> {
  data: T;
  total?: number;
  message?: string;
}

export interface PaginationParams {
  page: number;
  perPage: number;
}

export interface SortParams {
  field: string;
  order: 'ASC' | 'DESC';
}

export interface FilterParams {
  [key: string]: any;
}
