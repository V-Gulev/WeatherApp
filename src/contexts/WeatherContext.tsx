import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './AuthContext';

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
  addToFavorites: (city: string) => Promise<void>;
  removeFromFavorites: (city: string) => Promise<void>;
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
  const [favorites, setFavorites] = useState<string[]>([]);
  const [lastSearched, setLastSearched] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  // Load favorites from database when user is authenticated
  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      setFavorites([]);
    }
  }, [user]);

  const loadFavorites = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_favorites')
        .select('city_name')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading favorites:', error);
        return;
      }

      setFavorites(data?.map(fav => fav.city_name) || []);
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const searchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: functionError } = await supabase.functions.invoke('get-weather', {
        body: { city }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to fetch weather data');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setCurrentWeather(data);
      setLastSearched(city);
      
      // Store in localStorage for offline access
      localStorage.setItem('weatherApp_lastSearched', city);
      localStorage.setItem('weatherApp_currentWeather', JSON.stringify(data));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch weather data. Please try again.';
      setError(errorMessage);
      console.error('Weather search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocationWeather = async () => {
    setLoading(true);
    setError(null);
    
    try {
      if (!navigator.geolocation) {
        throw new Error('Geolocation is not supported by this browser');
      }

      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          timeout: 10000,
          enableHighAccuracy: true
        });
      });

      const { latitude, longitude } = position.coords;
      
      // Get weather by coordinates using our edge function
      const { data, error: functionError } = await supabase.functions.invoke('get-weather', {
        body: { coordinates: { lat: latitude, lon: longitude } }
      });

      if (functionError) {
        throw new Error(functionError.message || 'Failed to fetch weather data');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setCurrentWeather(data);
      setLastSearched(data.location);
      
      // Store in localStorage for offline access
      localStorage.setItem('weatherApp_lastSearched', data.location);
      localStorage.setItem('weatherApp_currentWeather', JSON.stringify(data));
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location weather. Please try again.';
      setError(errorMessage);
      console.error('Geolocation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (city: string) => {
    if (!user) {
      setError('Please log in to save favorites');
      return;
    }

    if (favorites.includes(city)) {
      return; // Already in favorites
    }

    try {
      const { error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          city_name: city
        });

      if (error) {
        throw new Error(error.message);
      }

      setFavorites(prev => [...prev, city]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add to favorites';
      setError(errorMessage);
      console.error('Add to favorites error:', err);
    }
  };

  const removeFromFavorites = async (city: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('city_name', city);

      if (error) {
        throw new Error(error.message);
      }

      setFavorites(prev => prev.filter(fav => fav !== city));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to remove from favorites';
      setError(errorMessage);
      console.error('Remove from favorites error:', err);
    }
  };

  const clearError = () => setError(null);

  // Load cached data on mount
  useEffect(() => {
    const cachedLastSearched = localStorage.getItem('weatherApp_lastSearched');
    const cachedWeather = localStorage.getItem('weatherApp_currentWeather');
    
    if (cachedLastSearched) {
      setLastSearched(cachedLastSearched);
    }
    
    if (cachedWeather) {
      try {
        setCurrentWeather(JSON.parse(cachedWeather));
      } catch (error) {
        console.error('Error parsing cached weather data:', error);
      }
    }
  }, []);

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