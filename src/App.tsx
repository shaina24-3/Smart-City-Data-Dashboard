import { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import StatCards from './components/StatCards';
import WeatherChart from './components/WeatherChart';
import RecentTable from './components/RecentTable';
import { fetchWeather, fetchForecast, fetchAirQuality } from './api/openWeather';
import { saveSearch, getSearches, type StoredSearch } from './lib/localStorage';
import { Loader2, CloudOff } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentCity, setCurrentCity] = useState('London');

  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [aqi, setAqi] = useState(1);
  const [weatherDescription, setWeatherDescription] = useState('');
  const [forecastData, setForecastData] = useState<Array<{ time: string; temp: number }>>([]);
  const [searchHistory, setSearchHistory] = useState<StoredSearch[]>([]);

  const loadWeatherData = async (city: string) => {
    setLoading(true);
    setError(null);

    try {
      const weatherData = await fetchWeather(city);

      const cityDisplay = `${weatherData.name}, ${weatherData.sys.country}`;
      setCurrentCity(cityDisplay);
      setTemperature(weatherData.main.temp);
      setHumidity(weatherData.main.humidity);
      setWindSpeed(weatherData.wind.speed);
      setWeatherDescription(weatherData.weather[0].description);

      const [forecast, airQuality] = await Promise.all([
        fetchForecast(weatherData.coord.lat, weatherData.coord.lon),
        fetchAirQuality(weatherData.coord.lat, weatherData.coord.lon),
      ]);

      const next24Hours = forecast.list.slice(0, 8).map((item) => ({
        time: new Date(item.dt * 1000).toLocaleTimeString('en-US', {
          hour: 'numeric',
          hour12: true,
        }),
        temp: item.main.temp,
      }));

      setForecastData(next24Hours);
      setAqi(airQuality.list[0]?.main.aqi || 1);

      saveSearch({
        city_name: weatherData.name,
        country: weatherData.sys.country,
        temperature: weatherData.main.temp,
        weather_condition: weatherData.weather[0].description,
        searched_at: new Date().toISOString(),
      });

      setSearchHistory(getSearches());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load weather data');
      console.error('Weather fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeatherData('London');
    setSearchHistory(getSearches());
  }, []);

  const handleSearch = (city: string) => {
    loadWeatherData(city);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header onSearch={handleSearch} />

        <main className="flex-1 p-8">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <span className="ml-2 text-gray-600">Loading weather data...</span>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-2">
                <CloudOff className="w-6 h-6 text-red-600" />
                <div>
                  <p className="font-semibold text-red-900">Error</p>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{currentCity}</h2>
                <p className="text-gray-600 capitalize">{weatherDescription}</p>
              </div>

              <StatCards
                temperature={temperature}
                humidity={humidity}
                windSpeed={windSpeed}
                aqi={aqi}
              />

              <WeatherChart forecastData={forecastData} />

              <RecentTable searches={searchHistory} onCityClick={handleSearch} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
