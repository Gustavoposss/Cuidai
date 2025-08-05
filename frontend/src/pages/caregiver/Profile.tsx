import { useState } from 'react';
import { Edit, Star, MapPin, Phone, Mail, Calendar, Award, BookOpen, Clock, DollarSign } from 'lucide-react';

const CaregiverProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile] = useState({
    name: 'Ana Costa',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    email: 'ana.costa@email.com',
    phone: '(11) 98765-4321',
    location: 'Vila Madalena, São Paulo - SP',
    rating: 4.8,
    reviews: 127,
    experience: '5 anos',
    hourlyRate: 'R$ 45',
    specialties: ['Idosos', 'Alzheimer', 'Cuidados Pós-Operatórios', 'Fisioterapia'],
    certifications: [
      'Auxiliar de Enfermagem - SENAC',
      'Cuidador de Idosos - Instituto de Geriatria',
      'Primeiros Socorros - Cruz Vermelha'
    ],
    availability: {
      monday: { morning: true, afternoon: true, evening: false },
      tuesday: { morning: true, afternoon: true, evening: false },
      wednesday: { morning: true, afternoon: true, evening: false },
      thursday: { morning: true, afternoon: true, evening: false },
      friday: { morning: true, afternoon: true, evening: false },
      saturday: { morning: false, afternoon: false, evening: false },
      sunday: { morning: false, afternoon: false, evening: false }
    },
    about: 'Sou uma cuidadora dedicada com 5 anos de experiência no cuidado de idosos. Especializada em cuidados paliativos e demência, sempre priorizo o bem-estar e conforto dos meus pacientes.',
    languages: ['Português', 'Inglês Básico'],
    emergencyContact: {
      name: 'João Costa',
      relationship: 'Esposo',
      phone: '(11) 91234-5678'
    }
  });

  const [recentReviews] = useState([
    {
      id: 1,
      client: 'Maria Silva',
      rating: 5,
      comment: 'Ana é uma profissional excepcional. Muito atenciosa e cuidadosa com meu pai.',
      date: '10/12/2024'
    },
    {
      id: 2,
      client: 'Carlos Mendes',
      rating: 4,
      comment: 'Excelente cuidadora, pontual e responsável. Recomendo muito!',
      date: '08/12/2024'
    },
    {
      id: 3,
      client: 'Lucia Ferreira',
      rating: 5,
      comment: 'Ana tem muita experiência e paciência. Meu avô adorou ela!',
      date: '05/12/2024'
    }
  ]);

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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Meu Perfil</h1>
              <p className="text-gray-600">Gerencie suas informações pessoais e profissionais.</p>
            </div>
                     <button
           onClick={() => setIsEditing(!isEditing)}
           className="flex items-center space-x-2 px-4 py-2 bg-[#0fb198] text-white rounded-lg hover:bg-[#0b9f87] transition-colors"
         >
              <Edit className="h-4 w-4" />
              <span>{isEditing ? 'Salvar' : 'Editar'}</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex items-start space-x-6">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-900">{profile.rating}</span>
                      <span className="text-gray-600">({profile.reviews} avaliações)</span>
                    </div>
                  </div>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4" />
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>{profile.email}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre Mim</h3>
              <p className="text-gray-600 leading-relaxed">{profile.about}</p>
            </div>

            {/* Specialties */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Especialidades</h3>
              <div className="flex flex-wrap gap-2">
                {profile.specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#0fb19820] text-[#0b9f87] rounded-full text-sm font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Certificações</h3>
              <div className="space-y-3">
                {profile.certifications.map((certification, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-[#0fb198]" />
                    <span className="text-gray-700">{certification}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Disponibilidade</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(profile.availability).map(([day, periods]) => (
                  <div key={day} className="border border-gray-200 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">{getDayName(day)}</h4>
                    <div className="space-y-1">
                      {Object.entries(periods).map(([period, available]) => (
                        <div key={period} className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{getPeriodName(period)}</span>
                          <span className={`w-3 h-3 rounded-full ${available ? 'bg-[#0fb198]' : 'bg-gray-300'}`}></span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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
                      <div className="flex items-center space-x-1">
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span className="text-gray-600">Experiência</span>
                  </div>
                  <span className="font-semibold text-gray-900">{profile.experience}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-gray-600">Valor/Hora</span>
                  </div>
                  <span className="font-semibold text-gray-900">{profile.hourlyRate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-600">Certificações</span>
                  </div>
                  <span className="font-semibold text-gray-900">{profile.certifications.length}</span>
                </div>
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Idiomas</h3>
              <div className="space-y-2">
                {profile.languages.map((language, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{language}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contato de Emergência</h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">{profile.emergencyContact.name}</p>
                  <p className="text-sm text-gray-600">{profile.emergencyContact.relationship}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span className="text-sm text-gray-700">{profile.emergencyContact.phone}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-[#0fb198]" />
                    <span className="font-medium text-[#0fb198]">Atualizar Agenda</span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Award className="h-5 w-5 text-[#0fb198]" />
                    <span className="font-medium text-[#0fb198]">Adicionar Certificação</span>
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <DollarSign className="h-5 w-5 text-[#0fb198]" />
                    <span className="font-medium text-[#0fb198]">Ajustar Preços</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaregiverProfile; 