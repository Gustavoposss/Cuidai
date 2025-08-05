import { useState } from 'react';
import { Search, Star, MapPin, Clock, Heart, MessageCircle, Phone } from 'lucide-react';

const ClientSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    availability: '',
    rating: '',
    price: ''
  });

  const [caregivers] = useState([
    {
      id: 1,
      name: 'Ana Costa',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      rating: 4.8,
      reviews: 127,
      location: 'Vila Madalena, SP',
      hourlyRate: 'R$ 45',
      availability: 'Segunda a Sexta',
      specialties: ['Idosos', 'Alzheimer', 'Cuidados Pós-Operatórios'],
      experience: '5 anos',
      verified: true,
      isFavorite: false
    },
    {
      id: 2,
      name: 'Maria Silva',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
      rating: 4.9,
      reviews: 89,
      location: 'Pinheiros, SP',
      hourlyRate: 'R$ 50',
      availability: 'Fins de Semana',
      specialties: ['Cuidados Paliativos', 'Fisioterapia', 'Medicação'],
      experience: '8 anos',
      verified: true,
      isFavorite: true
    },
    {
      id: 3,
      name: 'Joana Santos',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 4.7,
      reviews: 203,
      location: 'Itaim Bibi, SP',
      hourlyRate: 'R$ 40',
      availability: 'Tempo Integral',
      specialties: ['Demência', 'Cuidados Básicos', 'Companhia'],
      experience: '3 anos',
      verified: true,
      isFavorite: false
    },
    {
      id: 4,
      name: 'Lucia Ferreira',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 4.6,
      reviews: 156,
      location: 'Jardins, SP',
      hourlyRate: 'R$ 55',
      availability: 'Plantões 12h',
      specialties: ['UTI', 'Cuidados Intensivos', 'Emergências'],
      experience: '10 anos',
      verified: true,
      isFavorite: false
    }
  ]);

  const handleFilterChange = (filter: string, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filter]: value
    }));
  };

  const toggleFavorite = (id: number) => {
    // Implementar lógica de favorito
    console.log('Toggle favorite:', id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Buscar Cuidadores</h1>
          <p className="text-gray-600">Encontre os melhores profissionais para cuidar do seu ente querido.</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg text-black shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search Input */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                 <input
                   type="text"
                   placeholder="Buscar por nome, especialidade..."
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0fb198] focus:border-transparent"
                 />
              </div>
            </div>

            {/* Location Filter */}
            <div>
                             <select
                 value={selectedFilters.location}
                 onChange={(e) => handleFilterChange('location', e.target.value)}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0fb198] focus:border-transparent"
               >
                <option value="">Localização</option>
                <option value="vila-madalena">Vila Madalena</option>
                <option value="pinheiros">Pinheiros</option>
                <option value="itaim-bibi">Itaim Bibi</option>
                <option value="jardins">Jardins</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div>
                             <select
                 value={selectedFilters.availability}
                 onChange={(e) => handleFilterChange('availability', e.target.value)}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0fb198] focus:border-transparent"
               >
                <option value="">Disponibilidade</option>
                <option value="weekdays">Segunda a Sexta</option>
                <option value="weekends">Fins de Semana</option>
                <option value="full-time">Tempo Integral</option>
                <option value="shifts">Plantões</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
                             <select
                 value={selectedFilters.rating}
                 onChange={(e) => handleFilterChange('rating', e.target.value)}
                 className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0fb198] focus:border-transparent"
               >
                <option value="">Avaliação</option>
                <option value="4.5">4.5+ estrelas</option>
                <option value="4.0">4.0+ estrelas</option>
                <option value="3.5">3.5+ estrelas</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caregivers.map((caregiver) => (
            <div key={caregiver.id} className="bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-4">
                    <img
                      src={caregiver.avatar}
                      alt={caregiver.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-900">{caregiver.name}</h3>
                        {caregiver.verified && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                            Verificado
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(caregiver.rating) 
                                  ? 'text-yellow-400 fill-current' 
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {caregiver.rating} ({caregiver.reviews} avaliações)
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(caregiver.id)}
                    className={`p-2 rounded-full transition-colors ${
                      caregiver.isFavorite 
                        ? 'text-red-500 hover:text-red-600' 
                        : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${caregiver.isFavorite ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{caregiver.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>{caregiver.availability}</span>
                </div>
                                 <div className="text-lg font-semibold text-[#0fb198]">
                   {caregiver.hourlyRate}/hora
                 </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Especialidades:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                                         {caregiver.specialties.map((specialty, index) => (
                       <span
                         key={index}
                         className="px-2 py-1 bg-[#0fb19820] text-[#0b9f87] text-xs rounded-full"
                       >
                         {specialty}
                       </span>
                     ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Experiência:</span> {caregiver.experience}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-gray-100 space-y-3">
                                 <button className="w-full bg-[#0fb198] text-white py-2 px-4 rounded-lg hover:bg-[#0b9f87] transition-colors flex items-center justify-center space-x-2">
                   <MessageCircle className="h-4 w-4" />
                   <span>Enviar Mensagem</span>
                 </button>
                 <button className="w-full border border-[#0fb198] text-[#0fb198] py-2 px-4 rounded-lg hover:bg-[#0fb19810] transition-colors flex items-center justify-center space-x-2">
                   <Phone className="h-4 w-4" />
                   <span>Ligar Agora</span>
                 </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <button className="bg-white border border-gray-300 text-white px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
            Carregar Mais Cuidadores
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientSearch; 