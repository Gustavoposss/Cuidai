import { useState } from 'react';
import { Calendar, Clock, Star, DollarSign, Users, TrendingUp, MessageCircle, Phone } from 'lucide-react';

const CaregiverDashboard = () => {
  const [todayAppointments] = useState([
    {
      id: 1,
      client: 'Maria Silva',
      time: '08:00 - 12:00',
      location: 'Vila Madalena, SP',
      status: 'confirmed',
      type: 'Cuidados Básicos'
    },
    {
      id: 2,
      client: 'João Santos',
      time: '14:00 - 18:00',
      location: 'Pinheiros, SP',
      status: 'pending',
      type: 'Fisioterapia'
    }
  ]);

  const [stats] = useState([
    { label: 'Agendamentos Hoje', value: '2', icon: Calendar, color: '#0fb198' },
    { label: 'Horas Trabalhadas', value: '24h', icon: Clock, color: '#0b9f87' },
    { label: 'Avaliação Média', value: '4.8', icon: Star, color: '#088d76' },
    { label: 'Ganhos do Mês', value: 'R$ 2.400', icon: DollarSign, color: '#047b65' }
  ]);

  const [recentReviews] = useState([
    {
      id: 1,
      client: 'Ana Costa',
      rating: 5,
      comment: 'Excelente profissional, muito atenciosa e cuidadosa.',
      date: '10/12/2024'
    },
    {
      id: 2,
      client: 'Carlos Mendes',
      rating: 4,
      comment: 'Muito pontual e responsável. Recomendo!',
      date: '08/12/2024'
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo de volta! Aqui está um resumo das suas atividades.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
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
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Agenda de Hoje</h2>
              </div>
              <div className="p-6">
                {todayAppointments.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum agendamento hoje</h3>
                    <p className="text-gray-600">Aproveite para atualizar sua disponibilidade!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {todayAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-[#0fb19820] rounded-full flex items-center justify-center">
                            <Users className="h-6 w-6 text-[#0fb198]" />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{appointment.client}</h3>
                            <p className="text-sm text-gray-600">{appointment.time} • {appointment.type}</p>
                            <p className="text-sm text-gray-500">{appointment.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                                                     <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                             appointment.status === 'confirmed' 
                               ? 'bg-[#0fb19820] text-[#0b9f87]' 
                               : 'bg-yellow-100 text-yellow-800'
                           }`}>
                             {appointment.status === 'confirmed' ? 'Confirmado' : 'Pendente'}
                           </span>
                          <div className="flex space-x-2">
                            <button className="p-2 text-[#0fb198] hover:bg-[#0fb19810] rounded-full transition-colors">
                              <MessageCircle className="h-4 w-4" />
                            </button>
                            <button className="p-2 text-[#0fb198] hover:bg-[#0fb19810] rounded-full transition-colors">
                              <Phone className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#0fb198] hover:bg-[#0fb19810] transition-colors">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-[#0fb198]" />
                    <span className="font-medium text-[#0fb198]">Atualizar Agenda</span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#0fb198] hover:bg-[#0fb19810] transition-colors">
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-5 w-5 text-[#0fb198]" />
                    <span className="font-medium text-[#0fb198]">Ver Mensagens</span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-[#0fb198] hover:bg-[#0fb19810] transition-colors">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-[#0fb198]" />
                    <span className="font-medium text-[#0fb198]">Relatórios</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Reviews */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Avaliações Recentes</h3>
              <div className="space-y-4">
                {recentReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{review.client}</h4>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Earnings Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumo Financeiro</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Esta semana:</span>
                  <span className="font-semibold text-[#0fb198]">R$ 600</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Este mês:</span>
                  <span className="font-semibold text-[#0fb198]">R$ 2.400</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total ganho:</span>
                  <span className="font-semibold text-[#0fb198]">R$ 12.800</span>
                </div>
                <div className="pt-4 border-t border-gray-100">
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Ver Detalhes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Calendar Preview */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximos Dias</h3>
          <div className="grid grid-cols-7 gap-4">
            {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium text-gray-600 mb-2">{day}</div>
                <div className="w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center mx-auto">
                  <span className="text-sm font-medium text-gray-900">{index + 1}</span>
                </div>
                {index === 2 && (
                  <div className="mt-2">
                    <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverDashboard; 