import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from 'react-native-dotenv';

interface AuthContextType {
  user: string | null;
  isAuth: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/authseller/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.auth === true && data.token) {
        await AsyncStorage.setItem('token', data.token);
        setIsAuth(true);
        setUser(username);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('Login error:', error);
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem('token');
      await fetch(`${API_URL}/authseller/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      await AsyncStorage.removeItem('token');
      setIsAuth(false);
      setUser(null);
      return true;
    } catch (error) {
      console.log('Logout error:', error);
      return false;
    }
  };


  // Ya NO bloqueamos la UI por loading, así el usuario siempre ve algo (p.ej. login)
  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
