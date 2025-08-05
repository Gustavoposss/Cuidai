import { AuthService } from '../services/authService.js';

export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
    
    if (!token) {
      return res.status(401).json({ 
        error: 'Token de acesso necessário' 
      });
    }
    
    // Verificar token
    const decoded = AuthService.verifyToken(token);
    
    // Buscar usuário no banco
    const user = await AuthService.getUserById(decoded.userId);
    if (!user) {
      return res.status(401).json({ 
        error: 'Usuário não encontrado' 
      });
    }
    
    // Adicionar informações do usuário à requisição
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      userType: user.userType
    };
    
    next();
    
  } catch (error) {
    return res.status(403).json({ 
      error: 'Token inválido ou expirado' 
    });
  }
};

// Middleware para verificar tipo de usuário
export const requireUserType = (allowedTypes) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        error: 'Autenticação necessária' 
      });
    }
    
    if (!allowedTypes.includes(req.user.userType)) {
      return res.status(403).json({ 
        error: 'Acesso negado para este tipo de usuário' 
      });
    }
    
    next();
  };
};

// Middleware para verificar se é cliente
export const requireClient = requireUserType(['CLIENT']);

// Middleware para verificar se é cuidador
export const requireCaregiver = requireUserType(['CAREGIVER']);

// Middleware para verificar se é admin
export const requireAdmin = requireUserType(['ADMIN']); 