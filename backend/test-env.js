import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Testando variáveis de ambiente...');
console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Configurada' : 'Não configurada');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Configurado' : 'Não configurado');
console.log('PORT:', process.env.PORT);
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN); 