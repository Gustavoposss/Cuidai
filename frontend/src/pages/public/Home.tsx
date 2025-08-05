import { Star, Users, MapPin, Phone, ChevronRight, Check } from "lucide-react";
import { useState, useEffect } from "react";

const Home = () => {
  const [stats] = useState([
    { value: "500+", label: "Cuidadores Ativos" },
    { value: "2K+", label: "Famílias Atendidas" },
    { value: "98%", label: "Satisfação" },
  ]);

  // Efeito de digitação para o hero
  const [typedText, setTypedText] = useState("");
  const phrases = ["cuidado humano", "profissionais qualificados", "segurança"];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i <= phrases[currentPhraseIndex].length) {
        setTypedText(phrases[currentPhraseIndex].substring(0, i));
        i++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, [currentPhraseIndex]);

  return (
    <div className="min-h-screen bg-gray-50 scroll-smooth">
      {/* Hero Section - Melhorado com animação e gradiente mais suave */}
      <section className="bg-gradient-to-br from-[#047b65] via-[#0b9f87] to-[#0fb198] text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-20 w-64 h-64 bg-[#0fb198] rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-20 w-64 h-64 bg-[#0b9f87] rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Conectamos idosos a <br />
            <span className="text-[#0fb198] border-b-4 border-[#0b9f87] pb-2">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            A plataforma mais confiável para encontrar cuidadores qualificados ou oferecer seus serviços com segurança
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#0fb198] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg flex items-center gap-2">
              Encontrar Cuidador <ChevronRight size={20} />
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#0fb198] transition-all transform hover:scale-105 flex items-center gap-2">
              Seja um Cuidador
            </button>
          </div>
          
          {/* Stats Bar */}
          <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-3 divide-x divide-white/20">
              {stats.map((stat, index) => (
                <div key={index} className="px-4 py-2">
                  <p className="text-3xl font-bold text-[#ffffff]">{stat.value}</p>
                  <p className="text-[#ffffff]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios - Com animação hover */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#0fb19820] text-[#0b9f87] px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Por que escolher o Cuidai?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Cuidado profissional com <br className="hidden md:block" /> a comodidade que você merece
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 text-[#0fb198]" />,
                title: "Cuidadores Verificados",
                description: "Todos passam por verificação de identidade, antecedentes e qualificações profissionais",
                features: ["Certificados verificados", "Entrevista pessoal", "Avaliações transparentes"]
              },
              {
                icon: <MapPin className="h-8 w-8 text-[#0fb198]" />,
                title: "Busca Inteligente",
                description: "Encontre os melhores profissionais próximos a você com nosso sistema de matching",
                features: ["Filtros avançados", "Disponibilidade em tempo real", "Perfil completo"]
              },
              {
                icon: <Phone className="h-8 w-8 text-[#0fb198]" />,
                title: "Suporte Dedicado",
                description: "Nossa equipe está disponível 24/7 para qualquer necessidade ou emergência",
                features: ["Assistência imediata", "Mediação de conflitos", "Garantia de satisfação"]
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#0fb198] group"
              >
                <div className="bg-[#0fb19820] w-16 h-16 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#0fb19840] transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-start text-gray-600">
                      <Check className="h-5 w-5 text-[#0fb198] mt-0.5 mr-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Depoimentos - Carrossel melhorado */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-[#0fb19810]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-[#0fb19820] text-[#0b9f87] px-4 py-1 rounded-full text-sm font-semibold mb-3">
              Depoimentos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Histórias reais de <br className="hidden md:block" /> quem usa nossa plataforma
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                rating: 5,
                quote: "Encontrei uma cuidadora excepcional para meu pai com Alzheimer. O processo foi transparente e seguro, diferente de outros sites.",
                author: "Maria Silva",
                role: "Filha",
                avatar: "https://randomuser.me/api/portraits/women/65.jpg"
              },
              {
                rating: 5,
                quote: "Como cuidadora, valorizo a seriedade da plataforma. Consigo bons clientes e recebo pagamentos pontuais, sem preocupações.",
                author: "Ana Costa",
                role: "Cuidadora Profissional",
                avatar: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                rating: 4,
                quote: "A praticidade de agendar e acompanhar tudo pelo app mudou nossa rotina. Meu avô adorou a cuidadora selecionada!",
                author: "Carlos Mendes",
                role: "Neto",
                avatar: "https://randomuser.me/api/portraits/men/32.jpg"
              }
            ].map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-600 mb-6 text-lg italic">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 bg-[#0fb198] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para transformar o cuidado ao idoso?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Cadastre-se agora e experimente a diferença
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#0fb198] px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              Começar Agora
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-[#0fb198] transition-all">
              Falar com Especialista
            </button>
          </div>
        </div>
      </section>

      {/* Footer Aprimorado */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="h-5 w-5" /> Cuidai
              </h3>
              <p className="mb-4">
                A plataforma mais confiável para cuidados geriátricos no Brasil
              </p>
              <div className="flex gap-4">
                {['Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                  <a 
                    key={social} 
                    href="#" 
                    className="hover:text-white transition-colors"
                    aria-label={social}
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                      {social.charAt(0)}
                    </div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                {['Sobre Nós', 'Como Funciona', 'Preços', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Para Cuidadores</h4>
              <ul className="space-y-2">
                {['Cadastre-se', 'Central de Ajuda', 'Termos', 'Dicas'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">Contato</h4>
              <address className="not-italic">
                <p className="mb-2">contato@cuidai.com.br</p>
                <p className="mb-2">(11) 98765-4321</p>
                <p>São Paulo - SP</p>
              </address>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center text-sm">
            <p>© {new Date().getFullYear()} Cuidai. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;