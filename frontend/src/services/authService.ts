import api from './api';

export interface User {
  id: string;
  name: string;
  email: string;
  userType: 'client' | 'caregiver';
  createdAt?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: 'client' | 'caregiver';
}

export interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

// Função para normalizar userType (converter maiúsculo para minúsculo)
const normalizeUserType = (userType: string): 'client' | 'caregiver' => {
  return userType.toLowerCase() as 'client' | 'caregiver';
};

export class AuthService {
  // Login do usuário
  static async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/login', data);
      // Normalizar userType na resposta
      response.data.user.userType = normalizeUserType(response.data.user.userType);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro no login');
    }
  }

  // Registrar novo usuário
  static async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await api.post('/auth/register', data);
      // Normalizar userType na resposta
      response.data.user.userType = normalizeUserType(response.data.user.userType);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro no registro');
    }
  }

  // Obter perfil do usuário
  static async getProfile(): Promise<{ user: User }> {
    try {
      const response = await api.get('/auth/profile');
      // Normalizar userType na resposta
      response.data.user.userType = normalizeUserType(response.data.user.userType);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao buscar perfil');
    }
  }

  // Atualizar perfil do usuário
  static async updateProfile(data: Partial<User>): Promise<{ user: User; message: string }> {
    try {
      const response = await api.put('/auth/profile', data);
      // Normalizar userType na resposta
      response.data.user.userType = normalizeUserType(response.data.user.userType);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao atualizar perfil');
    }
  }

  // Verificar se o token é válido
  static async validateToken(): Promise<boolean> {
    try {
      const token = localStorage.getItem('cuidai_token');
      if (!token) return false;

      await this.getProfile();
      return true;
    } catch (error) {
      return false;
    }
  }

  // Salvar dados de autenticação no localStorage
  static saveAuthData(user: User, token: string): void {
    localStorage.setItem('cuidai_user', JSON.stringify(user));
    localStorage.setItem('cuidai_token', token);
  }

  // Limpar dados de autenticação
  static clearAuthData(): void {
    localStorage.removeItem('cuidai_user');
    localStorage.removeItem('cuidai_token');
  }

  // Obter usuário do localStorage
  static getUserFromStorage(): User | null {
    try {
      const userData = localStorage.getItem('cuidai_user');
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      return null;
    }
  }
} 