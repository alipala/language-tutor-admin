import { AuthProvider } from 'react-admin';
import { authService } from '../services/authService';

// React Admin auth provider implementation
export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      await authService.login({ email: username, password });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(new Error('Invalid credentials'));
    }
  },

  logout: () => {
    authService.logout();
    return Promise.resolve();
  },

  checkAuth: () => {
    return authService.isAuthenticated()
      ? Promise.resolve()
      : Promise.reject(new Error('Not authenticated'));
  },

  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      authService.logout();
      return Promise.reject();
    }
    return Promise.resolve();
  },

  getIdentity: () => {
    const user = authService.getCurrentUser();
    return user
      ? Promise.resolve({
          id: user.id,
          fullName: user.name,
          avatar: undefined,
        })
      : Promise.reject();
  },

  getPermissions: () => {
    const user = authService.getCurrentUser();
    return user ? Promise.resolve(user.permissions) : Promise.reject();
  },
};
