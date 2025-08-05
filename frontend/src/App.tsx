import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navigation from './components/navigation/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Auth from './pages/public/Auth';
import Home from './pages/public/Home';

// Páginas do Cliente
import ClientDashboard from './pages/client/Dashboard';
import ClientSearch from './pages/client/Search';
import ClientAppointments from './pages/client/Appointments';

// Páginas do Cuidador
import CaregiverDashboard from './pages/caregiver/Dashboard';
import CaregiverProfile from './pages/caregiver/Profile';
import CaregiverSchedule from './pages/caregiver/Schedule';

// Páginas Compartilhadas
import Profile from './pages/shared/Profile';
import SettingsPage from './pages/shared/Settings';

// Componente que usa o contexto de autenticação
const AppContent = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation 
        userType={user?.userType || null} 
      />
      
      <Routes>
        {/* Rotas Públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Rotas do Cliente (Protegidas) */}
        <Route path="/client/dashboard" element={
          <ProtectedRoute requiredUserType="client">
            <ClientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/client/search" element={
          <ProtectedRoute requiredUserType="client">
            <ClientSearch />
          </ProtectedRoute>
        } />
        <Route path="/client/appointments" element={
          <ProtectedRoute requiredUserType="client">
            <ClientAppointments />
          </ProtectedRoute>
        } />
        
        {/* Rotas do Cuidador (Protegidas) */}
        <Route path="/caregiver/dashboard" element={
          <ProtectedRoute requiredUserType="caregiver">
            <CaregiverDashboard />
          </ProtectedRoute>
        } />
        <Route path="/caregiver/profile" element={
          <ProtectedRoute requiredUserType="caregiver">
            <CaregiverProfile />
          </ProtectedRoute>
        } />
        <Route path="/caregiver/schedule" element={
          <ProtectedRoute requiredUserType="caregiver">
            <CaregiverSchedule />
          </ProtectedRoute>
        } />
        
        {/* Rotas Compartilhadas (Protegidas) */}
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;