// Application configuration constants
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'https://mytacoai.com',
  ENDPOINTS: {
    ADMIN_LOGIN: '/api/admin/login',
    ADMIN_USERS: '/api/admin/users',
    ADMIN_DASHBOARD: '/api/admin/dashboard',
    ADMIN_HEALTH: '/api/admin/health',
  },
  TIMEOUT: 10000,
} as const;

export const APP_CONFIG = {
  NAME: 'Language Tutor Admin',
  VERSION: '1.0.0',
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 25,
    PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
  },
} as const;

export const STORAGE_KEYS = {
  ADMIN_TOKEN: 'admin_token',
  ADMIN_USER: 'admin_user',
  THEME: 'admin_theme',
} as const;

export const USER_ROLES = {
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin',
} as const;

export const PERMISSIONS = {
  READ_USERS: 'read:users',
  WRITE_USERS: 'write:users',
  READ_ANALYTICS: 'read:analytics',
  SYSTEM_ADMIN: 'system:admin',
} as const;
