import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  icon: string;
  country: string;
}

interface WeatherContextType {
  currentWeather: WeatherData | null;
  favorites: string[];
  lastSearched: string | null;
  loading: boolean;
  error: string | null;
  searchWeather: (city: string) => Promise<void>;
  getCurrentLocationWeather: () => Promise<void>;
  addToFavorites: (city: string) => void;
  removeFromFavorites: (city: string) => void;
  clearError: () => void;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

interface WeatherProviderProps {
  children: ReactNode;
}

export const WeatherProvider: React.FC<WeatherProviderProps> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const stored = localStorage.getItem('weatherApp_favorites');
    return stored ? JSON.parse(stored) : [];
  });
  const [lastSearched, setLastSearched] = useState<string | null>(() => {
    return localStorage.getItem('weatherApp_lastSearched');
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mockWeatherData = (city: string): WeatherData => ({
    location: city,
    temperature: Math.floor(Math.random() * 30) + 5,
    description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 40) + 40,
    windSpeed: Math.floor(Math.random() * 20) + 5,
    visibility: Math.floor(Math.random() * 5) + 8,
    pressure: Math.floor(Math.random() * 50) + 1000,
    icon: '01d',
    country: 'US'
  });

  const searchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const weatherData = mockWeatherData(city);
      setCurrentWeather(weatherData);
      setLastSearched(city);
      localStorage.setItem('weatherApp_lastSearched', city);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocationWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate getting current location
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const weatherData = mockWeatherData('Your Location');
      setCurrentWeather(weatherData);
    } catch (err) {
      setError('Failed to get location weather. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (city: string) => {
    if (!favorites.includes(city)) {
      const newFavorites = [...favorites, city];
      setFavorites(newFavorites);
      localStorage.setItem('weatherApp_favorites', JSON.stringify(newFavorites));
    }
  };

  const removeFromFavorites = (city: string) => {
    const newFavorites = favorites.filter(fav => fav !== city);
    setFavorites(newFavorites);
    localStorage.setItem('weatherApp_favorites', JSON.stringify(newFavorites));
  };

  const clearError = () => setError(null);

  const value = {
    currentWeather,
    favorites,
    lastSearched,
    loading,
    error,
    searchWeather,
    getCurrentLocationWeather,
    addToFavorites,
    removeFromFavorites,
    clearError
  };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};