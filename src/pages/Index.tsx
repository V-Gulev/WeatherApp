import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import weatherHero from '@/assets/weather-hero.jpg';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Heart, Search, User, LogIn } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: Search,
      title: "City Search",
      description: "Search weather for any city worldwide with instant results"
    },
    {
      icon: Heart,
      title: "Favorites",
      description: "Save your favorite cities for quick weather access"
    },
    {
      icon: Wind,
      title: "Detailed Info",
      description: "Get humidity, wind speed, pressure, and visibility data"
    },
    {
      icon: User,
      title: "Personal Account",
      description: "Sync your preferences and favorites across devices"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={weatherHero} 
            alt="Beautiful weather background" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-sky/50"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
            {/* Weather Icons Animation */}
            <div className="flex justify-center space-x-8 mb-8">
              <Sun className="w-16 h-16 text-weather-sunny animate-float" style={{ animationDelay: '0s' }} />
              <Cloud className="w-16 h-16 text-primary animate-float" style={{ animationDelay: '0.5s' }} />
              <CloudRain className="w-16 h-16 text-weather-rainy animate-float" style={{ animationDelay: '1s' }} />
            </div>

            <div className="space-y-6">
              <Badge variant="secondary" className="text-sm px-4 py-2">
                🌤️ Beautiful Weather App
              </Badge>
              
              <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-lg">
                Weather
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {" "}Forecast
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Get beautiful, accurate weather forecasts for any city worldwide. 
                Save favorites, track conditions, and stay prepared.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-6 shadow-weather hover:scale-105 transition-transform">
                  <User className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-transform"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-white">
              Everything You Need for Weather
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Advanced features designed to keep you informed about the weather conditions that matter to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="group bg-white/10 backdrop-blur-sm border-white/20 hover:shadow-weather transition-all duration-300 hover:scale-105 animate-slide-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/30 transition-colors">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-center">
            <div className="space-y-3">
              <div className="text-4xl font-bold text-white">
                ∞
              </div>
              <div className="text-white/80">
                Cities Worldwide
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold text-white">
                24/7
              </div>
              <div className="text-white/80">
                Real-time Updates
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-4xl font-bold text-white">
                100%
              </div>
              <div className="text-white/80">
                Free to Use
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto space-y-8">
            <h2 className="text-4xl font-bold text-white">
              Ready to Start Tracking Weather?
            </h2>
            <p className="text-xl text-white/80">
              Join thousands of users who trust our weather forecasts for their daily planning.
            </p>
            <Link to="/register">
              <Button size="lg" className="text-lg px-10 py-6 shadow-weather hover:scale-105 transition-transform">
                <Thermometer className="w-5 h-5 mr-2" />
                Start Forecasting Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black/20 backdrop-blur-sm border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/60">
            © 2024 Weather App. Made with ❤️ for weather enthusiasts.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
