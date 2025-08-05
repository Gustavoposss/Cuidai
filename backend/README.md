# Cuidai Backend

Backend API para o projeto Cuidai usando Prisma e Supabase.

## 🚀 Configuração

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação

1. **Instalar dependências:**
```bash
npm install
```

2. **Configurar variáveis de ambiente:**
O arquivo `.env` já está configurado com:
```

3. **Sincronizar banco de dados:**
```bash
npx prisma db push
```

4. **Gerar cliente Prisma:**
```bash
npx prisma generate
```

## 🏃‍♂️ Executando

### Desenvolvimento
```bash
npm run dev
```

### Produção
```bash
npm start
```

## 📡 Endpoints

### Autenticação

#### POST `/api/auth/register`
Registrar novo usuário.

**Body:**
```json
{
  "name": "Nome do Usuário",
  "email": "usuario@exemplo.com",
  "password": "senha123",
  "userType": "client" // ou "caregiver"
}
```

#### POST `/api/auth/login`
Fazer login.

**Body:**
```json
{
  "email": "usuario@exemplo.com",
  "password": "senha123"
}
```

#### GET `/api/auth/profile`
Obter perfil do usuário (requer token).

**Headers:**
```
Authorization: Bearer <token>
```

#### PUT `/api/auth/profile`
Atualizar perfil do usuário (requer token).

**Headers:**
```
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "Novo Nome",
  "email": "novo@email.com"
}
```

### Outros Endpoints

#### GET `/`
Informações da API.

#### GET `/health`
Health check da API.

## 🗄️ Banco de Dados

O projeto usa Prisma como ORM com PostgreSQL no Supabase.

### Modelo de Usuário
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String
  name      String
  userType  UserType
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("users")
}

enum UserType {
  CLIENT
  CAREGIVER
  ADMIN
}
```

## 🔧 Desenvolvimento

### Estrutura do Projeto
```
src/
├── controllers/     # Controllers da API
├── middleware/      # Middlewares (auth, etc.)
├── routes/          # Rotas da API
├── services/        # Lógica de negócio
└── server.js        # Servidor principal
```

### Comandos Úteis

```bash
# Verificar status do banco
npx prisma studio

# Resetar banco de dados
npx prisma db push --force-reset

# Gerar cliente Prisma
npx prisma generate

# Ver logs do Prisma
npx prisma db push --preview-feature
```

## 🧪 Testes

Para testar a API:

```bash
node test-auth.js
```

## 🌐 Padronização Frontend/Backend

O sistema está configurado para aceitar valores em minúsculo do frontend e convertê-los automaticamente para maiúsculo no banco de dados.

### Fluxo de Dados
```
Frontend (PT) → Backend (Normalização) → Banco (EN) → Frontend (PT)
     ↓              ↓                      ↓              ↓
  "cliente"    → "CLIENT"             → "CLIENT"    → "client"
  "cuidador"   → "CAREGIVER"          → "CAREGIVER" → "caregiver"
```

### Padrões
- **Interface**: Português ("Cliente", "Cuidador")
- **API**: Aceita minúsculo, processa maiúsculo
- **Banco**: Maiúsculo (padrão enum)
- **Código**: Inglês (variáveis e funções)

Veja mais detalhes em `PADRONIZACAO.md`.

## 📝 Notas

- O sistema usa JWT para autenticação
- Senhas são hasheadas com bcrypt
- CORS configurado para frontend em localhost:5173
- Banco de dados hospedado no Supabase
- Padronização automática entre frontend e backend 
