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
  // Subscription fields
  stripe_customer_id?: string;
  subscription_status?: 'active' | 'canceled' | 'past_due' | 'expired' | 'canceling';
  subscription_plan?: 'try_learn' | 'fluency_builder' | 'team_mastery';
  subscription_period?: 'monthly' | 'annual';
  subscription_price_id?: string;
  subscription_expires_at?: string;
  subscription_started_at?: string;
  current_period_start?: string;
  current_period_end?: string;
  practice_sessions_used?: number;
  assessments_used?: number;
  learning_plan_preserved?: boolean;
  learning_plan_data?: any;
  learning_plan_progress?: any;
}

export interface SubscriptionDetails {
  status?: string;
  plan?: string;
  period?: string;
  price_id?: string;
  expires_at?: string;
  started_at?: string;
  stripe_customer_id?: string;
  usage: {
    practice_sessions_used: number;
    assessments_used: number;
    current_period_start?: string;
    current_period_end?: string;
  };
  preservation: {
    is_preserved: boolean;
    plan_data?: any;
    progress_data?: any;
  };
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
