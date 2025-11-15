const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export interface WeatherData {
  name: string;
  sys: { country: string };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  coord: {
    lat: number;
    lon: number;
  };
}

export interface ForecastData {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      description: string;
    }>;
  }>;
}

export interface AirQualityData {
  list: Array<{
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no2: number;
      o3: number;
      pm2_5: number;
      pm10: number;
    };
  }>;
}

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const response = await fetch(
    `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('City not found');
  }

  return response.json();
};

export const fetchForecast = async (lat: number, lon: number): Promise<ForecastData> => {
  const response = await fetch(
    `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Forecast not available');
  }

  return response.json();
};

export const fetchAirQuality = async (lat: number, lon: number): Promise<AirQualityData> => {
  const response = await fetch(
    `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error('Air quality data not available');
  }

  return response.json();
};
