import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WeatherResponse {
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { city, coordinates } = body;
    
    if (!city && !coordinates) {
      return new Response(
        JSON.stringify({ error: 'City or coordinates parameter is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const apiKey = Deno.env.get('OPENWEATHER_API_KEY');
    
    if (!apiKey) {
      console.error('OpenWeather API key not found');
      return new Response(
        JSON.stringify({ error: 'Weather service configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    let weatherUrl: string;
    
    if (coordinates) {
      console.log(`Fetching weather for coordinates: ${coordinates.lat}, ${coordinates.lon}`);
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    } else {
      console.log(`Fetching weather for city: ${city}`);
      weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    }
    
    const response = await fetch(weatherUrl);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenWeather API error:', response.status, errorData);
      
      if (response.status === 404) {
        return new Response(
          JSON.stringify({ error: 'City not found. Please check the spelling and try again.' }),
          { 
            status: 404, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'Unable to fetch weather data. Please try again later.' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const data = await response.json();
    
    console.log('Weather data received for:', data.name);

    // Transform the API response to match our interface
    const weatherData: WeatherResponse = {
      location: data.name,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description
        .split(' ')
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' '),
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      visibility: data.visibility ? Math.round(data.visibility / 1000) : 10, // Convert meters to km
      pressure: data.main.pressure,
      icon: data.weather[0].icon,
      country: data.sys.country,
    };

    return new Response(
      JSON.stringify(weatherData),
      { 
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in get-weather function:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});