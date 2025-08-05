import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Mail, Lock, User, HeartPulse, Eye, EyeOff, Check, Loader } from 'lucide-react';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    userType: 'client' as 'client' | 'caregiver'
  });

  const { login, register, isLoading, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (isAuthenticated && user) {
      const redirectPath = user.userType === 'client' ? '/client/dashboard' : '/caregiver/dashboard';
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Limpar erro quando o usuário digita
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          userType: formData.userType
        });
      }

      // O redirecionamento será feito pelo useEffect acima
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ocorreu um erro inesperado');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      userType: 'client'
    });
    setError('');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  // Se está carregando ou já autenticado, mostrar loading
  if (isLoading || isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0fb19810] to-[#0b9f8710] flex items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0fb198]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0fb19810] to-[#0b9f8710] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HeartPulse className="h-8 w-8 text-[#0fb198]" />
            <span className="text-xl font-bold text-[#047b65]">Cuidai</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Conectamos idosos a cuidado humano
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            {isLogin 
              ? "Acesse sua conta para gerenciar seus cuidados ou serviços" 
              : "Junte-se à nossa comunidade de cuidados"}
          </p>
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <Check className="h-5 w-5 text-green-500" />
            <span>Todos os cuidadores são verificados</span>
          </div>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-xl shadow-md p-6 text-black">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {isLogin ? "Acesse sua conta" : "Crie sua conta"}
          </h2>
          
          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* User Type Selection */}
            <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
              <button
                type="button"
                onClick={() => handleInputChange('userType', 'client')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  formData.userType === 'client'
                    ? 'bg-white text-[#0fb198] shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Cliente
              </button>
              <button
                type="button"
                onClick={() => handleInputChange('userType', 'caregiver')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  formData.userType === 'caregiver'
                    ? 'bg-white text-[#0fb198] shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Cuidador
              </button>
            </div>

            {/* Name Field (only for register) */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0fb198] focus:border-transparent"
                    placeholder="Digite seu nome completo"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0fb198] focus:border-transparent"
                  placeholder="Digite seu email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0fb198] focus:border-transparent"
                  placeholder="Digite sua senha"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#0fb198] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#0b9f87] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  {isLogin ? 'Entrando...' : 'Cadastrando...'}
                </>
              ) : (
                isLogin ? 'Entrar' : 'Cadastrar'
              )}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
              <button
                onClick={toggleMode}
                className="ml-1 text-[#0fb198] hover:text-[#0b9f87] font-medium"
              >
                {isLogin ? 'Cadastre-se' : 'Faça login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;