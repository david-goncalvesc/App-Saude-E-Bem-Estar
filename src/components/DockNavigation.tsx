import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, User, MessageCircle, MapPin, Settings } from 'lucide-react';

const DockNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-4 bg-black/80 backdrop-blur-lg rounded-full shadow-2xl border border-white/10">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/favorites')}
          className={`group relative p-3 rounded-full transition-all duration-300 hover:bg-white/10
            ${location.pathname === '/favorites' ? 'bg-white/20' : ''}`}
        >
          <Home className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 
            ${location.pathname === '/favorites' ? 'text-white' : 'text-white/70'}`} />
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Início
          </span>
        </button>

        <button
          onClick={() => navigate('/')}
          className={`group relative p-3 rounded-full transition-all duration-300 hover:bg-white/10
            ${location.pathname === '/' ? 'bg-white/20' : ''}`}
        >
          <User className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 
            ${location.pathname === '/' ? 'text-white' : 'text-white/70'}`} />
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Perfil
          </span>
        </button>

        <button
          onClick={() => navigate('/emergency')}
          className={`group relative p-4 rounded-full bg-gradient-to-r from-red-500 to-red-600 transform scale-125 transition-all duration-300 hover:scale-130 hover:shadow-lg hover:shadow-red-500/50
            ${location.pathname === '/emergency' ? 'ring-2 ring-red-400' : ''}`}
        >
          <MessageCircle className="w-7 h-7 text-white" />
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Emergência
          </span>
        </button>

        <button
          onClick={() => navigate('/locations')}
          className={`group relative p-3 rounded-full transition-all duration-300 hover:bg-white/10
            ${location.pathname === '/locations' ? 'bg-white/20' : ''}`}
        >
          <MapPin className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 
            ${location.pathname === '/locations' ? 'text-white' : 'text-white/70'}`} />
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Locais
          </span>
        </button>

        <button
          onClick={() => navigate('/settings')}
          className={`group relative p-3 rounded-full transition-all duration-300 hover:bg-white/10
            ${location.pathname === '/settings' ? 'bg-white/20' : ''}`}
        >
          <Settings className={`w-6 h-6 transition-all duration-300 group-hover:scale-110 
            ${location.pathname === '/settings' ? 'text-white' : 'text-white/70'}`} />
          <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            Configurações
          </span>
        </button>
      </div>
    </nav>
  );
};

export default DockNavigation;