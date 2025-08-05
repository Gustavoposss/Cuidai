// frontend/src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { AuthService, type User, type LoginData, type RegisterData } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await AuthService.login({ email, password });
      
      // Salvar dados no localStorage
      AuthService.saveAuthData(response.user, response.token);
      setUser(response.user);
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Limpar dados do usuário
    setUser(null);
    AuthService.clearAuthData();
    
    // Redirecionar para a página inicial
    window.location.href = '/';
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      const response = await AuthService.register(userData);
      
      // Salvar dados no localStorage
      AuthService.saveAuthData(response.user, response.token);
      setUser(response.user);
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setIsLoading(true);
      const response = await AuthService.updateProfile(data);
      
      // Atualizar dados no localStorage
      AuthService.saveAuthData(response.user, localStorage.getItem('cuidai_token') || '');
      setUser(response.user);
      
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar autenticação ao carregar a página
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar se há dados salvos
        const savedUser = AuthService.getUserFromStorage();
        if (savedUser) {
          // Validar token com o backend
          const isValid = await AuthService.validateToken();
          if (isValid) {
            setUser(savedUser);
          } else {
            AuthService.clearAuthData();
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        AuthService.clearAuthData();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};