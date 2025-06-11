import { useState, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

interface User {
  id: string;
  name: string;
  email: string;
}

export function useAuth() {
  const [user, setUser] = useLocalStorage<User | null>('taskflow-user', null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: crypto.randomUUID(),
          name: email.split('@')[0],
          email,
        };
        setUser(mockUser);
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  }, [setUser]);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    // Simulate API call
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const mockUser: User = {
          id: crypto.randomUUID(),
          name,
          email,
        };
        setUser(mockUser);
        setIsLoading(false);
        resolve();
      }, 1000);
    });
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
  }, [setUser]);

  return {
    user,
    isLoading,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };
}