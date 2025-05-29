import React, { useState, useEffect } from 'react';
import { Heart, Phone, Eye, X } from 'lucide-react';
import type { HealthUnit } from '../data/healthUnits';
import { healthUnits } from '../data/healthUnits';

const FavoritesScreen: React.FC = () => {
  const [favorites, setFavorites] = useState<HealthUnit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = () => {
      const savedFavorites = localStorage.getItem('userFavorites');
      const favoriteIds = savedFavorites ? JSON.parse(savedFavorites) : [];
      const favoriteUnits = healthUnits.filter(unit => favoriteIds.includes(unit.id));
      setFavorites(favoriteUnits);
      setLoading(false);
    };

    loadFavorites();
    window.addEventListener('storage', loadFavorites);
    return () => window.removeEventListener('storage', loadFavorites);
  }, []);

  const removeFavorite = (unitId: number) => {
    const savedFavorites = localStorage.getItem('userFavorites');
    const favoriteIds = savedFavorites ? JSON.parse(savedFavorites) : [];
    const updatedFavorites = favoriteIds.filter((id: number) => id !== unitId);
    localStorage.setItem('userFavorites', JSON.stringify(updatedFavorites));
    setFavorites(prev => prev.filter(unit => unit.id !== unitId));
    window.dispatchEvent(new Event('storage'));
  };

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <Heart className="w-16 h-16 text-gray-300 mb-4" />
        <p className="text-xl text-gray-500 text-center">Nenhum favorito ainda</p>
        <p className="text-gray-400 text-center mt-2">
          Adicione unidades aos favoritos para vê-las aqui
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Meus Favoritos</h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
          {favorites.length} unidade{favorites.length !== 1 ? 's' : ''}
        </span>
      </div>

      {favorites.map(unit => (
        <div
          key={unit.id}
          className="bg-white rounded-lg shadow-md p-4 transition-transform hover:scale-[1.02]"
          role="article"
          aria-label={`Informações sobre ${unit.name}`}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg">{unit.name}</h3>
              <span className={`
                inline-block px-2 py-1 rounded-full text-xs font-medium mt-1
                ${unit.type === 'Hospital' ? 'bg-blue-100 text-blue-800' :
                  unit.type === 'Clínica' ? 'bg-green-100 text-green-800' :
                  'bg-yellow-100 text-yellow-800'}
              `}>
                {unit.type}
              </span>
            </div>
            <button
              onClick={() => removeFavorite(unit.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
              aria-label="Remover dos favoritos"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-gray-600 text-sm mb-3">{unit.description}</p>
          <p className="text-gray-500 text-sm mb-3">
            <span className="font-medium">Distância:</span> {unit.distance}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => window.open(`tel:${unit.phone}`)}
              className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              aria-label={`Ligar para ${unit.name}`}
            >
              <Phone size={16} />
              <span>Ligar</span>
            </button>
            <button
              onClick={() => {
                // Implement details view
              }}
              className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
              aria-label={`Ver detalhes de ${unit.name}`}
            >
              <Eye size={16} />
              <span>Detalhes</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoritesScreen;