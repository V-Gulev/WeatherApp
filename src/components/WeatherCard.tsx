import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WeatherData } from '@/contexts/WeatherContext';
import { Thermometer, Droplets, Wind, Eye, Gauge } from 'lucide-react';

interface WeatherCardProps {
  weather: WeatherData;
  className?: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, className = '' }) => {
  const getWeatherIcon = (description: string) => {
    switch (description.toLowerCase()) {
      case 'sunny':
        return '☀️';
      case 'cloudy':
        return '☁️';
      case 'rainy':
        return '🌧️';
      case 'partly cloudy':
        return '⛅';
      default:
        return '🌤️';
    }
  };

  const getGradientClass = (description: string) => {
    switch (description.toLowerCase()) {
      case 'sunny':
        return 'bg-gradient-sunset';
      case 'rainy':
        return 'bg-gradient-storm';
      default:
        return 'bg-gradient-sky';
    }
  };

  return (
    <Card className={`overflow-hidden shadow-weather border-0 ${className}`}>
      <div className={`${getGradientClass(weather.description)} p-1`}>
        <CardContent className="bg-card/90 backdrop-blur-sm rounded-lg p-6 m-0">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-foreground">{weather.location}</h3>
                <p className="text-sm text-muted-foreground">{weather.country}</p>
              </div>
              <div className="text-6xl animate-float">
                {getWeatherIcon(weather.description)}
              </div>
            </div>

            {/* Temperature */}
            <div className="text-center space-y-2">
              <div className="text-6xl font-bold text-primary">
                {weather.temperature}°
              </div>
              <Badge variant="secondary" className="text-sm">
                {weather.description}
              </Badge>
            </div>

            {/* Weather Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Droplets className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Humidity</p>
                  <p className="font-semibold">{weather.humidity}%</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <Wind className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Wind</p>
                  <p className="font-semibold">{weather.windSpeed} km/h</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 bg-secondary/60 rounded-full flex items-center justify-center">
                  <Eye className="w-4 h-4 text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Visibility</p>
                  <p className="font-semibold">{weather.visibility} km</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50">
                <div className="w-8 h-8 bg-weather-cloudy/10 rounded-full flex items-center justify-center">
                  <Gauge className="w-4 h-4 text-weather-cloudy" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pressure</p>
                  <p className="font-semibold">{weather.pressure} hPa</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default WeatherCard;