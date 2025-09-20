import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useWeather } from '@/contexts/WeatherContext';
import { ArrowLeft, Heart, Trash2, Search } from 'lucide-react';

const FavoritesPage = () => {
  const { user } = useAuth();
  const { favorites, removeFromFavorites, searchWeather } = useWeather();

  const handleCityClick = async (city: string) => {
    await searchWeather(city);
  };

  const handleRemoveFavorite = (city: string) => {
    removeFromFavorites(city);
  };

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border/50 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link to="/weather">
            <Button variant="ghost" size="sm" className="h-9">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-primary">Favorite Cities</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="max-w-4xl mx-auto">
          {favorites.length > 0 ? (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-xl font-semibold text-foreground">
                  Your Favorite Cities
                </h2>
                <p className="text-muted-foreground">
                  Click on any city to see its current weather
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((city) => (
                  <Card 
                    key={city} 
                    className="group cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-weather border-0 bg-card/80 backdrop-blur-sm"
                    onClick={() => handleCityClick(city)}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <span className="flex items-center">
                          <Heart className="w-5 h-5 mr-2 text-red-500 fill-current" />
                          {city}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFavorite(city);
                          }}
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Search className="w-4 h-4 mr-2" />
                        Click to view weather
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-16 space-y-6">
              <div className="text-6xl mb-6">💙</div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-foreground">
                  No Favorite Cities Yet
                </h2>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Search for cities on the weather page and add them to your favorites 
                  for quick access to their weather information.
                </p>
              </div>
              <Link to="/weather">
                <Button className="shadow-soft">
                  <Search className="w-4 h-4 mr-2" />
                  Search Weather
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default FavoritesPage;