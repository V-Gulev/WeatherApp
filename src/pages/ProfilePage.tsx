import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useWeather } from '@/contexts/WeatherContext';
import { ArrowLeft, Mail, User, Heart, Search, MapPin } from 'lucide-react';

const ProfilePage = () => {
  const { user } = useAuth();
  const { favorites, lastSearched } = useWeather();

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
          <h1 className="text-2xl font-bold text-primary">Profile</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Profile Card */}
          <Card className="shadow-weather border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto shadow-soft">
                <User className="w-10 h-10 text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-2xl">{user?.name}</CardTitle>
                <div className="flex items-center justify-center mt-2 text-muted-foreground">
                  <Mail className="w-4 h-4 mr-2" />
                  {user?.email}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {favorites.length}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center mt-1">
                    <Heart className="w-4 h-4 mr-1" />
                    Favorite Cities
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-accent">
                    {lastSearched ? '1' : '0'}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center mt-1">
                    <Search className="w-4 h-4 mr-1" />
                    Recent Searches
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="shadow-weather border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {lastSearched ? (
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Last searched city</p>
                      <p className="text-sm text-muted-foreground">{lastSearched}</p>
                    </div>
                  </div>
                  <Badge variant="secondary">Recent</Badge>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No recent searches yet</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Favorite Cities */}
          <Card className="shadow-weather border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Favorite Cities</CardTitle>
              <Link to="/favorites">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {favorites.length > 0 ? (
                <div className="space-y-2">
                  {favorites.slice(0, 3).map((city) => (
                    <div key={city} className="flex items-center space-x-3 p-2">
                      <Heart className="w-4 h-4 text-red-500 fill-current" />
                      <span>{city}</span>
                    </div>
                  ))}
                  {favorites.length > 3 && (
                    <p className="text-sm text-muted-foreground mt-2">
                      +{favorites.length - 3} more cities
                    </p>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Heart className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No favorite cities yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;