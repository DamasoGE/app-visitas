import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

interface AuthContextType {
  user: string | null;
  isAuth: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  checkAuth: () => Promise<void>;
}

export const useAuth = () => {
  const context = useContext<AuthContextType | null>(AuthContext);

  if (context === null) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }

  return context;
};
