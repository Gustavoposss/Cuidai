import { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle, AlertCircle, MessageCircle, Phone, Search } from 'lucide-react';

const ClientAppointments = () => {
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [appointments] = useState([
    {
      id: 1,
      caregiver: 'Ana Costa',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      date: '15/12/2024',
      time: '14:00 - 18:00',
      duration: '4 horas',
      location: 'Rua Augusta, 123 - Vila Madalena',
      status: 'confirmed',
      type: 'upcoming',
      price: 'R$ 180,00',
      notes: 'Cuidados básicos e companhia'
    },
    {
      id: 2,
      caregiver: 'Maria Silva',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      date: '18/12/2024',
      time: '08:00 - 12:00',
      duration: '4 horas',
      location: 'Av. Paulista, 456 - Bela Vista',
      status: 'pending',
      type: 'upcoming',
      price: 'R$ 200,00',
      notes: 'Fisioterapia e medicação'
    },
    {
      id: 3,
      caregiver: 'Joana Santos',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      date: '10/12/2024',
      time: '16:00 - 20:00',
      duration: '4 horas',
      location: 'Rua Oscar Freire, 789 - Jardins',
      status: 'completed',
      type: 'past',
      price: 'R$ 160,00',
      notes: 'Cuidados pós-operatórios'
    },
    {
      id: 4,
      caregiver: 'Lucia Ferreira',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      date: '05/12/2024',
      time: '10:00 - 14:00',
      duration: '4 horas',
      location: 'Rua Haddock Lobo, 321 - Cerqueira César',
      status: 'cancelled',
      type: 'past',
      price: 'R$ 220,00',
      notes: 'Cuidados intensivos'
    }
  ]);

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', text: 'Confirmado' };
      case 'pending':
        return { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100', text: 'Pendente' };
      case 'completed':
        return { icon: CheckCircle, color: 'text-blue-600', bg: 'bg-blue-100', text: 'Concluído' };
      case 'cancelled':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', text: 'Cancelado' };
      default:
        return { icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-100', text: 'Desconhecido' };
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    if (selectedTab === 'upcoming') {
      return appointment.type === 'upcoming';
    } else if (selectedTab === 'past') {
      return appointment.type === 'past';
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Meus Agendamentos</h1>
          <p className="text-gray-600">Gerencie seus compromissos e acompanhe o histórico.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                     <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
             <div className="flex items-center justify-between">
               <div>
                 <p className="text-sm font-medium text-gray-600">Próximos</p>
                 <p className="text-2xl font-bold text-[#0fb198]">2</p>
               </div>
               <div className="p-3 rounded-full bg-[#0fb19820]">
                 <Calendar className="h-6 w-6 text-[#0fb198]" />
               </div>
             </div>
           </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Concluídos</p>
                <p className="text-2xl font-bold text-green-600">15</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">1</p>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Gasto</p>
                <p className="text-2xl font-bold text-purple-600">R$ 2.450</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setSelectedTab('upcoming')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'upcoming'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Próximos Agendamentos
              </button>
              <button
                onClick={() => setSelectedTab('past')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedTab === 'past'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Histórico
              </button>
            </nav>
          </div>

          {/* Appointments List */}
          <div className="p-6">
            {filteredAppointments.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Nenhum agendamento encontrado
                </h3>
                <p className="text-gray-600">
                  {selectedTab === 'upcoming' 
                    ? 'Você não tem agendamentos futuros.' 
                    : 'Você ainda não tem agendamentos concluídos.'
                  }
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredAppointments.map((appointment) => {
                  const statusInfo = getStatusInfo(appointment.status);
                  const StatusIcon = statusInfo.icon;

                  return (
                    <div key={appointment.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <img
                            src={appointment.avatar}
                            alt={appointment.caregiver}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{appointment.caregiver}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                                {statusInfo.text}
                              </span>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Calendar className="h-4 w-4" />
                                  <span>{appointment.date}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <Clock className="h-4 w-4" />
                                  <span>{appointment.time} ({appointment.duration})</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <MapPin className="h-4 w-4" />
                                  <span>{appointment.location}</span>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div>
                                  <span className="font-medium">Valor:</span> {appointment.price}
                                </div>
                                <div>
                                  <span className="font-medium">Observações:</span> {appointment.notes}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
                        </div>
                      </div>

                      {/* Actions */}
                      {appointment.status === 'confirmed' && (
                        <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-3">
                                           <button className="flex items-center space-x-2 px-4 py-2 bg-[#0fb198] text-white rounded-lg hover:bg-[#0b9f87] transition-colors">
                   <MessageCircle className="h-4 w-4" />
                   <span>Mensagem</span>
                 </button>
                 <button className="flex items-center space-x-2 px-4 py-2 border border-[#0fb198] text-[#0fb198] rounded-lg hover:bg-[#0fb19810] transition-colors">
                   <Phone className="h-4 w-4" />
                   <span>Ligar</span>
                 </button>
                          <button className="flex items-center space-x-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                            <XCircle className="h-4 w-4" />
                            <span>Cancelar</span>
                          </button>
                        </div>
                      )}

                      {appointment.status === 'pending' && (
                        <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-3">
                                           <button className="flex items-center space-x-2 px-4 py-2 bg-[#0fb198] text-white rounded-lg hover:bg-[#0b9f87] transition-colors">
                   <CheckCircle className="h-4 w-4" />
                   <span>Confirmar</span>
                 </button>
                          <button className="flex items-center space-x-2 px-4 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
                            <XCircle className="h-4 w-4" />
                            <span>Recusar</span>
                          </button>
                        </div>
                      )}

                      {appointment.status === 'completed' && (
                        <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-3">
                                           <button className="flex items-center space-x-2 px-4 py-2 bg-[#0fb198] text-white rounded-lg hover:bg-[#0b9f87] transition-colors">
                   <MessageCircle className="h-4 w-4" />
                   <span>Enviar Mensagem</span>
                 </button>
                 <button className="flex items-center space-x-2 px-4 py-2 border border-[#0fb198] text-[#0fb198] rounded-lg hover:bg-[#0fb19810] transition-colors">
                   <User className="h-4 w-4" />
                   <span>Ver Perfil</span>
                 </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <Calendar className="h-5 w-5 text-[#0fb198]" />
              <span className="font-medium text-[#0fb198]">Novo Agendamento</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <Search className="h-5 w-5 text-[#0fb198]" />
              <span className="font-medium text-[#0fb198]">Buscar Cuidadores</span>
            </button>
            <button className="flex items-center justify-center space-x-2 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors">
              <MessageCircle className="h-5 w-5 text-[#0fb198]" />
              <span className="font-medium text-[#0fb198]">Ver Mensagens</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientAppointments; 