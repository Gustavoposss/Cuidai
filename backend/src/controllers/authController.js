import { AuthService } from '../services/authService.js';

export class AuthController {
  
  // Registrar novo usuário
  static async register(req, res) {
    try {
      const { email, password, name, userType } = req.body;
      
      // Validações básicas
      if (!email || !password || !name || !userType) {
        return res.status(400).json({
          error: 'Todos os campos são obrigatórios'
        });
      }
      
      // Normalizar userType (aceitar minúsculo e converter para maiúsculo)
      const normalizedUserType = userType.toUpperCase();
      
      if (!['CLIENT', 'CAREGIVER'].includes(normalizedUserType)) {
        return res.status(400).json({
          error: 'Tipo de usuário deve ser "cliente" ou "cuidador"'
        });
      }
      
      if (password.length < 6) {
        return res.status(400).json({
          error: 'Senha deve ter pelo menos 6 caracteres'
        });
      }
      
      // Registrar usuário
      const result = await AuthService.register({
        email,
        password,
        name,
        userType: normalizedUserType
      });
      
      res.status(201).json({
        message: 'Usuário registrado com sucesso',
        user: result.user,
        token: result.token
      });
      
    } catch (error) {
      console.error('Erro no registro:', error);
      res.status(400).json({
        error: error.message
      });
    }
  }
  
  // Login do usuário
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      
      // Validações básicas
      if (!email || !password) {
        return res.status(400).json({
          error: 'Email e senha são obrigatórios'
        });
      }
      
      // Fazer login
      const result = await AuthService.login(email, password);
      
      res.json({
        message: 'Login realizado com sucesso',
        user: result.user,
        token: result.token
      });
      
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(401).json({
        error: error.message
      });
    }
  }
  
  // Obter perfil do usuário
  static async getProfile(req, res) {
    try {
      const user = await AuthService.getUserById(req.user.id);
      
      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          userType: user.userType,
          createdAt: user.createdAt
        }
      });
      
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      res.status(500).json({
        error: 'Erro ao buscar perfil do usuário'
      });
    }
  }
  
  // Atualizar perfil do usuário
  static async updateProfile(req, res) {
    try {
      const { name, email } = req.body;
      const userId = req.user.id;
      
      // Validações
      if (!name && !email) {
        return res.status(400).json({
          error: 'Pelo menos um campo deve ser fornecido'
        });
      }
      
      // Atualizar usuário
      const updatedUser = await AuthService.updateUser(userId, { name, email });
      
      res.json({
        message: 'Perfil atualizado com sucesso',
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          name: updatedUser.name,
          userType: updatedUser.userType,
          createdAt: updatedUser.createdAt
        }
      });
      
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      res.status(500).json({
        error: 'Erro ao atualizar perfil'
      });
    }
  }
} 