import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  email: string;
  licenses: License[];
  hoursDriven: number;
  friends: string[];
  role: 'user' | 'admin';
}

interface License {
  sim: string;
  category: string;
  track: string;
  earned: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (error) {
        localStorage.removeItem('auth_token');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In production, replace with actual API call
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem('auth_token', token);
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      // Mock authentication for demo purposes
      if (email === 'admin@fluxterrasimworks.com' && password === 'admin123') {
        const mockUser: User = {
          id: '1',
          email,
          licenses: [],
          hoursDriven: 150,
          friends: [],
          role: 'admin'
        };
        const mockToken = btoa(JSON.stringify(mockUser));
        localStorage.setItem('auth_token', mockToken);
        setUser(mockUser);
        return true;
      }
      if (email === 'user@example.com' && password === 'user123') {
        const mockUser: User = {
          id: '2',
          email,
          licenses: [
            { sim: 'ACC', category: 'GT3', track: 'Monza', earned: '2024-01-15' }
          ],
          hoursDriven: 50,
          friends: [],
          role: 'user'
        };
        const mockToken = btoa(JSON.stringify(mockUser));
        localStorage.setItem('auth_token', mockToken);
        setUser(mockUser);
        return true;
      }
      return false;
    }
  };

  const register = async (email: string, password: string): Promise<boolean> => {
    try {
      // In production, replace with actual API call
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const { token, user } = await response.json();
        localStorage.setItem('auth_token', token);
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      // Mock registration for demo purposes
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        licenses: [],
        hoursDriven: 0,
        friends: [],
        role: 'user'
      };
      const mockToken = btoa(JSON.stringify(mockUser));
      localStorage.setItem('auth_token', mockToken);
      setUser(mockUser);
      return true;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isAuthenticated,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};