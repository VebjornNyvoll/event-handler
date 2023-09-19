import { createContext, Dispatch, FC, PropsWithChildren, SetStateAction, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext<{
  favorites: string[];
  setFavorites: Dispatch<SetStateAction<string[]>>;
} | null>(null);

export const useFavoritesContext = () => useContext(FavoritesContext)!;

export const FavoritesProvider: FC<PropsWithChildren> = ({ children }) => {
  const getValueSnapshot = () => {
    const value = localStorage.getItem('favorites');
    return value ? JSON.parse(value) : [];
  };
  const [favorites, setFavorites] = useState<string[]>(getValueSnapshot);

  useEffect(() => {
    const trigger = () => {
      setFavorites(getValueSnapshot);
    };
    window.addEventListener('storage', trigger);
    return () => window.removeEventListener('storage', trigger);
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  return <FavoritesContext.Provider value={{ favorites, setFavorites }}>{children}</FavoritesContext.Provider>;
};
