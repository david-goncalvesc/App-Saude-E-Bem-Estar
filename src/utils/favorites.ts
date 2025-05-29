export const toggleFavorite = (unitId: number): void => {
  const savedFavorites = localStorage.getItem('userFavorites');
  const favoriteIds = savedFavorites ? JSON.parse(savedFavorites) : [];
  
  const index = favoriteIds.indexOf(unitId);
  if (index === -1) {
    favoriteIds.push(unitId);
  } else {
    favoriteIds.splice(index, 1);
  }
  
  localStorage.setItem('userFavorites', JSON.stringify(favoriteIds));
  window.dispatchEvent(new Event('storage'));
};

export const isFavorite = (unitId: number): boolean => {
  const savedFavorites = localStorage.getItem('userFavorites');
  const favoriteIds = savedFavorites ? JSON.parse(savedFavorites) : [];
  return favoriteIds.includes(unitId);
};