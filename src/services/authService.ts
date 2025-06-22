import { AdminUser } from '../types';
import { API_CONFIG, STORAGE_KEYS } from '../config/constants';
import { httpClient } from './httpClient';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: AdminUser;
}

// Authentication service following single responsibility principle
class AuthService {
  public async login(credentials: LoginCredentials): Promise<AdminUser> {
    try {
      const response = await httpClient.post<LoginResponse>(
        API_CONFIG.ENDPOINTS.ADMIN_LOGIN,
        credentials
      );

      this.storeAuthData(response);
      return response.user;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  }

  public logout(): void {
    this.clearAuthData();
  }

  public getCurrentUser(): AdminUser | null {
    const userData = localStorage.getItem(STORAGE_KEYS.ADMIN_USER);
    return userData ? JSON.parse(userData) : null;
  }

  public getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_TOKEN);
  }

  public isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getCurrentUser();
  }

  public hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    return user?.permissions.includes(permission) ?? false;
  }

  public hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  private storeAuthData(response: LoginResponse): void {
    localStorage.setItem(STORAGE_KEYS.ADMIN_TOKEN, response.access_token);
    localStorage.setItem(STORAGE_KEYS.ADMIN_USER, JSON.stringify(response.user));
  }

  private clearAuthData(): void {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_USER);
  }
}

// Export singleton instance
export const authService = new AuthService();
