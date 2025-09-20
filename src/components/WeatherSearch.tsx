import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useWeather } from '@/contexts/WeatherContext';
import { Search, MapPin } from 'lucide-react';

interface WeatherSearchProps {
  className?: string;
}

const WeatherSearch: React.FC<WeatherSearchProps> = ({ className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { searchWeather, getCurrentLocationWeather, loading } = useWeather();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchWeather(searchQuery.trim());
      setSearchQuery('');
    }
  };

  const handleLocationSearch = async () => {
    await getCurrentLocationWeather();
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 text-lg bg-card/80 backdrop-blur-sm border-border/50"
            disabled={loading}
          />
        </div>
        <Button 
          type="submit" 
          className="h-12 px-6 shadow-soft"
          disabled={loading || !searchQuery.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </form>

      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={handleLocationSearch}
          disabled={loading}
          className="h-10 bg-card/60 backdrop-blur-sm border-border/50 hover:bg-card/80"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Use Current Location
        </Button>
      </div>
    </div>
  );
};

export default WeatherSearch;