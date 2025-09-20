import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useWeather } from '@/contexts/WeatherContext';
import WeatherCard from '@/components/WeatherCard';
import WeatherSearch from '@/components/WeatherSearch';
import { Heart, User, Star, LogOut, Plus } from 'lucide-react';

const WeatherPage = () => {
  const { user, logout } = useAuth();
  const { currentWeather, error, lastSearched, searchWeather, addToFavorites, clearError } = useWeather();
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-search last searched city on page load
    if (lastSearched && !currentWeather) {
      searchWeather(lastSearched);
    }
  }, [lastSearched, currentWeather, searchWeather]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddToFavorites = () => {
    if (currentWeather) {
      addToFavorites(currentWeather.location);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-primary">Weather App</h1>
            <span className="text-muted-foreground">Welcome, {user?.name}</span>
          </div>
          
          <nav className="flex items-center space-x-2">
            <Link to="/favorites">
              <Button variant="ghost" size="sm" className="h-9">
                <Heart className="w-4 h-4 mr-2" />
                Favorites
              </Button>
            </Link>
            <Link to="/profile">
              <Button variant="ghost" size="sm" className="h-9">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </Link>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleLogout}
              className="h-9 text-destructive hover:text-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Search Section */}
        <div className="max-w-2xl mx-auto">
          <WeatherSearch />
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="max-w-2xl mx-auto">
            <AlertDescription>{error}</AlertDescription>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearError}
              className="mt-2"
            >
              Dismiss
            </Button>
          </Alert>
        )}

        {/* Weather Display */}
        {currentWeather ? (
          <div className="max-w-2xl mx-auto space-y-6">
            <WeatherCard weather={currentWeather} className="animate-fade-in" />
            
            <div className="flex justify-center">
              <Button 
                onClick={handleAddToFavorites}
                variant="outline"
                className="bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/80"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add to Favorites
              </Button>
            </div>
          </div>
        ) : !error && (
          <div className="text-center py-16 space-y-4">
            <div className="text-6xl mb-6">🌤️</div>
            <h2 className="text-2xl font-semibold text-foreground">
              Search for weather in any city
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Enter a city name above or use your current location to get started with beautiful weather forecasts.
            </p>
          </div>
        )}

        {/* Last Searched Info */}
        {lastSearched && (
          <div className="text-center text-sm text-muted-foreground">
            Last searched: {lastSearched}
          </div>
        )}
      </main>
    </div>
  );
};

export default WeatherPage;