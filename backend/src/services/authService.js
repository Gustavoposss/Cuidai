import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class AuthService {
  
  // Registrar novo usuário
  static async register(userData) {
    try {
      const { email, password, name, userType } = userData;
      
      // Verificar se o usuário já existe
      const existingUser = await prisma.user.findUnique({
        where: { email }
      });
      
      if (existingUser) {
        throw new Error('Usuário já existe com este email');
      }
      
      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Criar usuário no banco
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          userType
        }
      });
      
      // Gerar token JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          userType: user.userType
        },
        token
      };
      
    } catch (error) {
      throw new Error(`Erro no registro: ${error.message}`);
    }
  }
  
  // Login do usuário
  static async login(email, password) {
    try {
      // Buscar usuário no banco
      const user = await prisma.user.findUnique({
        where: { email }
      });
      
      if (!user) {
        throw new Error('Email ou senha incorretos');
      }
      
      // Verificar senha
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error('Email ou senha incorretos');
      }
      
      // Gerar token JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          userType: user.userType
        },
        token
      };
      
    } catch (error) {
      throw new Error(`Erro no login: ${error.message}`);
    }
  }
  
  // Verificar token JWT
  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
  
  // Buscar usuário por ID
  static async getUserById(userId) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });
      
      if (!user) {
        throw new Error('Usuário não encontrado');
      }
      
      return user;
      
    } catch (error) {
      throw new Error(`Erro ao buscar usuário: ${error.message}`);
    }
  }
  
  // Atualizar usuário
  static async updateUser(userId, updateData) {
    try {
      const { name, email } = updateData;
      const updateFields = {};
      
      if (name) updateFields.name = name;
      if (email) updateFields.email = email;
      
      if (Object.keys(updateFields).length === 0) {
        throw new Error('Nenhum campo para atualizar');
      }
      
      const user = await prisma.user.update({
        where: { id: userId },
        data: updateFields
      });
      
      return user;
      
    } catch (error) {
      throw new Error(`Erro ao atualizar usuário: ${error.message}`);
    }
  }
} 