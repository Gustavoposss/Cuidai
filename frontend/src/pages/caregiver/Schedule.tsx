import { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle, AlertCircle, Plus, Edit } from 'lucide-react';

const CaregiverSchedule = () => {
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [appointments] = useState([
    {
      id: 1,
      client: 'Maria Silva',
      date: '15/12/2024',
      time: '08:00 - 12:00',
      location: 'Vila Madalena, SP',
      status: 'confirmed',
      type: 'Cuidados Básicos',
      notes: 'Medicação às 10h'
    },
    {
      id: 2,
      client: 'João Santos',
      date: '15/12/2024',
      time: '14:00 - 18:00',
      location: 'Pinheiros, SP',
      status: 'pending',
      type: 'Fisioterapia',
      notes: 'Primeira sessão'
    },
    {
      id: 3,
      client: 'Ana Costa',
      date: '16/12/2024',
      time: '09:00 - 13:00',
      location: 'Jardins, SP',
      status: 'confirmed',
      type: 'Cuidados Pós-Operatórios',
      notes: 'Troca de curativo'
    }
  ]);

  const [availability] = useState({
    monday: { morning: true, afternoon: true, evening: false },
    tuesday: { morning: true, afternoon: true, evening: false },
    wednesday: { morning: true, afternoon: true, evening: false },
    thursday: { morning: true, afternoon: true, evening: false },
    friday: { morning: true, afternoon: true, evening: false },
    saturday: { morning: false, afternoon: false, evening: false },
    sunday: { morning: false, afternoon: false, evening: false }
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'confirmed':
        return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100', text: 'Confirmado' };
      case 'pending':
        return { icon: AlertCircle, color: 'text-yellow-600', bg: 'bg-yellow-100', text: 'Pendente' };
      case 'cancelled':
        return { icon: XCircle, color: 'text-red-600', bg: 'bg-red-100', text: 'Cancelado' };
      default:
        return { icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-100', text: 'Desconhecido' };
    }
  };

  const getDayName = (day: string) => {
    const days = {
      monday: 'Segunda',
      tuesday: 'Terça',
      wednesday: 'Quarta',
      thursday: 'Quinta',
      friday: 'Sexta',
      saturday: 'Sábado',
      sunday: 'Domingo'
    };
    return days[day as keyof typeof days] || day;
  };

  const getPeriodName = (period: string) => {
    const periods = {
      morning: 'Manhã',
      afternoon: 'Tarde',
      evening: 'Noite'
    };
    return periods[period as keyof typeof periods] || period;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Minha Agenda</h1>
              <p className="text-gray-600">Gerencie seus compromissos e disponibilidade.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'week'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Semana
                </button>
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                    viewMode === 'month'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Mês
                </button>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="h-4 w-4" />
                <span>Novo Compromisso</span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Calendário</h2>
              </div>
              <div className="p-6">
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-4 mb-6">
                  {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
                    <div key={day} className="text-center">
                      <div className="text-sm font-medium text-gray-600 mb-2">{day}</div>
                    </div>
                  ))}
                  {Array.from({ length: 35 }, (_, i) => {
                    const dayNumber = i + 1;
                    const hasAppointment = appointments.some(apt => apt.date.includes(dayNumber.toString()));
                    
                    return (
                      <div key={i} className="relative">
                        <div className={`w-12 h-12 rounded-lg border flex items-center justify-center mx-auto cursor-pointer transition-colors ${
                          hasAppointment 
                            ? 'border-blue-500 bg-blue-50 text-blue-700' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <span className="text-sm font-medium">{dayNumber}</span>
                        </div>
                        {hasAppointment && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Today's Appointments */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Compromissos de Hoje</h3>
                  {appointments.filter(apt => apt.date === '15/12/2024').length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h4 className="text-lg font-medium text-gray-900 mb-2">Nenhum compromisso hoje</h4>
                      <p className="text-gray-600">Aproveite para descansar ou atualizar sua disponibilidade!</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {appointments.filter(apt => apt.date === '15/12/2024').map((appointment) => {
                        const statusInfo = getStatusInfo(appointment.status);
                        const StatusIcon = statusInfo.icon;

                        return (
                          <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                                  <User className="h-6 w-6 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-3 mb-2">
                                    <h4 className="font-semibold text-gray-900">{appointment.client}</h4>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bg} ${statusInfo.color}`}>
                                      {statusInfo.text}
                                    </span>
                                  </div>
                                  <div className="space-y-1 text-sm text-gray-600">
                                    <div className="flex items-center space-x-2">
                                      <Clock className="h-4 w-4" />
                                      <span>{appointment.time}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <MapPin className="h-4 w-4" />
                                      <span>{appointment.location}</span>
                                    </div>
                                    <div>
                                      <span className="font-medium">Tipo:</span> {appointment.type}
                                    </div>
                                    {appointment.notes && (
                                      <div>
                                        <span className="font-medium">Observações:</span> {appointment.notes}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <StatusIcon className={`h-5 w-5 ${statusInfo.color}`} />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Availability Settings */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Disponibilidade</h3>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                {Object.entries(availability).map(([day, periods]) => (
                  <div key={day} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3">{getDayName(day)}</h4>
                    <div className="space-y-2">
                      {Object.entries(periods).map(([period, available]) => (
                        <div key={period} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{getPeriodName(period)}</span>
                          <span className={`w-4 h-4 rounded-full border-2 ${
                            available 
                              ? 'bg-green-500 border-green-500' 
                              : 'bg-gray-200 border-gray-300'
                          }`}></span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas da Semana</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Agendamentos:</span>
                  <span className="font-semibold text-blue-600">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Horas Trabalhadas:</span>
                  <span className="font-semibold text-green-600">32h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ganhos Estimados:</span>
                  <span className="font-semibold text-purple-600">R$ 1.440</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Clientes Únicos:</span>
                  <span className="font-semibold text-orange-600">5</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Plus className="h-5 w-5 text-[#0fb198]" />
                    <span className="font-medium text-[#0fb198]">Novo Agendamento</span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Edit className="h-5 w-5 text-[#0fb198]" />
                    <span className="font-medium text-[#0fb198]">Editar Disponibilidade</span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-[#0fb198]" />
                    <span className="font-medium text-[#0fb198]">Ver Relatórios</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Próximos Compromissos</h3>
              <div className="space-y-3">
                {appointments.slice(0, 3).map((appointment) => (
                  <div key={appointment.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900">{appointment.client}</h4>
                      <span className="text-xs text-gray-500">{appointment.date}</span>
                    </div>
                    <p className="text-sm text-gray-600">{appointment.time}</p>
                    <p className="text-xs text-gray-500">{appointment.location}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverSchedule; 