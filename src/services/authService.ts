// Placeholder auth service - will be replaced with real API calls

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor';
  age: number;
  gender: string;
}

// These functions are placeholders - actual implementation is in AuthContext
// They represent the API contract for when real backend is implemented

export const authService = {
  login: async (credentials: LoginCredentials) => {
    // TODO: Replace with actual API call
    // POST /api/auth/login
    console.log('Auth service login called:', credentials.email);
    return { success: true, token: 'mock-token', user: null };
  },

  signup: async (data: SignupData) => {
    // TODO: Replace with actual API call
    // POST /api/auth/signup
    console.log('Auth service signup called:', data.email);
    return { success: true, message: 'User created' };
  },

  logout: async () => {
    // TODO: Replace with actual API call
    // POST /api/auth/logout
    console.log('Auth service logout called');
    return { success: true };
  },

  getCurrentUser: async () => {
    // TODO: Replace with actual API call
    // GET /api/auth/me
    console.log('Auth service getCurrentUser called');
    return null;
  },

  refreshToken: async () => {
    // TODO: Replace with actual API call
    // POST /api/auth/refresh
    console.log('Auth service refreshToken called');
    return { success: true, token: 'new-mock-token' };
  },
};
