// frontend/src/components/navigation/Navigation.tsx
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, HeartPulse, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavigationProps {
  userType?: 'client' | 'caregiver' | null;
}

const Navigation = ({ userType }: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const isPublicPage = location.pathname === '/' || location.pathname === '/auth';

  if (isPublicPage) {
    return (
      <nav className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <HeartPulse className="h-8 w-8 text-[#0fb198]" />
              <span className="text-xl font-bold text-[#047b65]">Cuidai</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className="text-gray-600 hover:text-[#0fb198] transition-colors">
                Início
              </Link>
              <Link to="/auth" className="text-gray-600 hover:text-[#0fb198] transition-colors">
                Entrar
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col gap-4">
                <Link 
                  to="/" 
                  className="text-gray-600 hover:text-[#0fb198] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Início
                </Link>
                <Link 
                  to="/auth" 
                  className="text-gray-600 hover:text-[#0fb198] transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Entrar
                </Link>
                <Link 
                  to="/auth" 
                  className="bg-[#0fb198] text-white px-4 py-2 rounded-lg hover:bg-[#0b9f87] transition-colors text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cadastrar
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }

  // Navegação para usuários autenticados
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
                      <Link to="/" className="flex items-center gap-2">
              <HeartPulse className="h-8 w-8 text-[#0fb198]" />
              <span className="text-xl font-bold text-[#047b65]">Cuidai</span>
            </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {userType === 'client' && (
              <>
                                 <Link to="/client/dashboard" className="text-gray-600 hover:text-[#0fb198] transition-colors">
                   Dashboard
                 </Link>
                 <Link to="/client/search" className="text-gray-600 hover:text-[#0fb198] transition-colors">
                   Buscar Cuidadores
                 </Link>
                 <Link to="/client/appointments" className="text-gray-600 hover:text-[#0fb198] transition-colors">
                   Agendamentos
                 </Link>
              </>
            )}
            
            {userType === 'caregiver' && (
              <>
                                 <Link to="/caregiver/dashboard" className="text-gray-600 hover:text-[#0fb198] transition-colors">
                   Dashboard
                 </Link>
                 <Link to="/caregiver/profile" className="text-gray-600 hover:text-[#0fb198] transition-colors">
                   Meu Perfil
                 </Link>
                 <Link to="/caregiver/schedule" className="text-gray-600 hover:text-[#0fb198] transition-colors">
                   Agenda
                 </Link>
              </>
            )}

            {/* User Menu */}
            <div className="relative group">
                             <button className="flex items-center gap-2 text-gray-600 hover:text-[#0fb198] transition-colors">
                 <User className="h-5 w-5" />
                 <span>Minha Conta</span>
               </button>
              
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                                     <Link 
                     to="/profile" 
                     className="block px-4 py-2 text-gray-700 hover:bg-[#f0f9f7]"
                   >
                     Perfil
                   </Link>
                   <Link 
                     to="/settings" 
                     className="block px-4 py-2 text-gray-700 hover:bg-[#f0f9f7]"
                   >
                     Configurações
                   </Link>
                  <hr className="my-2" />
                                     <button 
                     onClick={handleLogout}
                     className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
                   >
                     <LogOut className="h-4 w-4" />
                     Sair
                   </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {userType === 'client' && (
                <>
                  <Link 
                    to="/client/dashboard" 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/client/search" 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Buscar Cuidadores
                  </Link>
                  <Link 
                    to="/client/appointments" 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Agendamentos
                  </Link>
                </>
              )}
              
              {userType === 'caregiver' && (
                <>
                  <Link 
                    to="/caregiver/dashboard" 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/caregiver/profile" 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Meu Perfil
                  </Link>
                  <Link 
                    to="/caregiver/schedule" 
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Agenda
                  </Link>
                </>
              )}
              
              <hr className="my-2" />
              <button 
                onClick={handleLogout}
                className="text-left text-red-600 hover:text-red-700 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;