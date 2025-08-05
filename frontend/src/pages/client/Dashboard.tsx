import { useState } from 'react';
import { Calendar, Search, Clock, Star, MapPin, Phone, MessageCircle } from 'lucide-react';

const ClientDashboard = () => {
  const [recentAppointments] = useState([
    {
      id: 1,
      caregiver: 'Ana Costa',
      date: '15/12/2024',
      time: '14:00 - 18:00',
      status: 'confirmado',
      rating: 5
    },
    {
      id: 2,
      caregiver: 'Maria Silva',
      date: '18/12/2024',
      time: '08:00 - 12:00',
      status: 'pendente',
      rating: 4
    }
  ]);

  const [quickStats] = useState([
    { label: 'Agendamentos Ativos', value: '3', icon: Calendar, color: '#0fb198' },
    { label: 'Cuidadores Favoritos', value: '5', icon: Star, color: '#0b9f87' },
    { label: 'Horas de Cuidado', value: '24h', icon: Clock, color: '#088d76' },
    { label: 'Avaliações Dadas', value: '8', icon: Star, color: '#047b65' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo de volta! Aqui está um resumo das suas atividades.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                                 <div className={`p-3 rounded-full`} style={{ backgroundColor: `${stat.color}20` }}>
                   <stat.icon className="h-6 w-6" style={{ color: stat.color }} />
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Appointments */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Agendamentos Recentes</h2>
              </div>
              <div className="p-6">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center space-x-4">
                                             <div className="w-12 h-12 bg-[#0fb19820] rounded-full flex items-center justify-center">
                         <Calendar className="h-6 w-6 text-[#0fb198]" />
                       </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{appointment.caregiver}</h3>
                        <p className="text-sm text-gray-600">{appointment.date} • {appointment.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.status === 'confirmado' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status}
                      </span>
                      <div className="flex items-center">
                        {[...Array(appointment.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                                   <button className="text-[#0fb198] hover:text-[#0b9f87] font-medium">
                   Ver todos os agendamentos →
                 </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                                 <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#0fb198] hover:bg-[#0fb19810] transition-colors">
                   <div className="flex items-center space-x-3">
                     <Search className="h-5 w-5 text-[#0fb198]" />
                     <span className="font-medium text-[#0fb198]">Buscar Cuidadores</span>
                   </div>
                 </button>
                 <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#0fb198] hover:bg-[#0fb19810] transition-colors">
                   <div className="flex items-center space-x-3">
                     <Calendar className="h-5 w-5 text-[#0fb198]" />
                     <span className="font-medium text-[#0fb198]">Novo Agendamento</span>
                   </div>
                 </button>
                 <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#0fb198] hover:bg-[#0fb19810] transition-colors">
                   <div className="flex items-center space-x-3">
                     <MessageCircle className="h-5 w-5 text-[#0fb198]" />
                     <span className="font-medium text-[#0fb198]">Mensagens</span>
                   </div>
                 </button>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contato de Emergência</h3>
              <div className="space-y-3">
                                 <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                   <Phone className="h-5 w-5 text-red-600" />
                   <div>
                     <p className="font-medium text-gray-900">Suporte 24/7</p>
                     <p className="text-sm text-gray-600">(11) 99999-9999</p>
                   </div>
                 </div>
                 <div className="flex items-center space-x-3 p-3 bg-[#0fb19820] rounded-lg">
                   <MapPin className="h-5 w-5 text-[#0fb198]" />
                   <div>
                     <p className="font-medium text-gray-900">Localização</p>
                     <p className="text-sm text-gray-600">São Paulo, SP</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard; 