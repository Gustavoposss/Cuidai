import express from 'express';
import { AuthController } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Rota pública - Registrar usuário
router.post('/register', AuthController.register);

// Rota pública - Login
router.post('/login', AuthController.login);

// Rota protegida - Obter perfil do usuário
router.get('/profile', authenticateToken, AuthController.getProfile);

// Rota protegida - Atualizar perfil
router.put('/profile', authenticateToken, AuthController.updateProfile);

export default router; 