import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'patient' | 'admin' | 'doctor';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  age?: number;
  gender?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  age: number;
  gender: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock users database
const mockUsers: (User & { password: string })[] = [
  { id: '1', name: 'John Patient', email: 'patient@example.com', password: 'password123', role: 'patient', age: 35, gender: 'male' },
  { id: '2', name: 'Admin User', email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { id: '3', name: 'Dr. Sharma', email: 'doctor@example.com', password: 'doctor123', role: 'doctor' },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('ayurveda_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    setIsLoading(false);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('ayurveda_user', JSON.stringify(userWithoutPassword));
      return { success: true, message: 'Login successful!' };
    }
    
    return { success: false, message: 'Invalid email or password' };
  }, []);

  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const existingUser = mockUsers.find(u => u.email === data.email);
    
    setIsLoading(false);
    
    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }
    
    // In real app, this would create user in database
    const newUser: User & { password: string } = {
      id: String(mockUsers.length + 1),
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      age: data.age,
      gender: data.gender,
    };
    
    mockUsers.push(newUser);
    
    return { success: true, message: 'Account created successfully! Please login.' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ayurveda_user');
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      signup,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};
