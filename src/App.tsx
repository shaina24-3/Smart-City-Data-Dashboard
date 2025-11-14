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

  // THEME: 'light' | 'dark'
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  // keep html element class in sync
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');

    try {
      localStorage.setItem('theme', theme);
    } catch {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

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
  const savedCity = localStorage.getItem("lastCity");

  if (savedCity) {
    loadWeatherData(savedCity);
  } else {
    loadWeatherData("London");
  }

  setSearchHistory(getSearches());
}, []);


  const handleSearch = (city: string) => {
  loadWeatherData(city);
  localStorage.setItem("lastCity", city);
};

  const dark = theme === 'dark';

  return (
    <div className={`flex min-h-screen ${dark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header onSearch={handleSearch} onToggleTheme={toggleTheme} dark={dark} />

        <main className="flex-1 p-8">
          {loading && (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
              <span className={`${dark ? 'text-gray-300' : 'text-gray-600'} ml-2`}>
                Loading weather data...
              </span>
            </div>
          )}

          {error && (
            <div className={`${dark ? 'bg-red-900 border-red-800' : 'bg-red-50 border-red-200'} border rounded-lg p-6 mb-6`}>
              <div className="flex items-center space-x-2">
                <CloudOff className="w-6 h-6 text-red-400" />
                <div>
                  <p className={`${dark ? 'text-red-200' : 'text-red-900'} font-semibold`}>Error</p>
                  <p className={`${dark ? 'text-red-100' : 'text-red-700'}`}>{error}</p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-6">
              <div>
                <h2 className={`${dark ? 'text-gray-100' : 'text-gray-900'} text-3xl font-bold mb-2`}>{currentCity}</h2>
                <p className={`${dark ? 'text-gray-300' : 'text-gray-600'} capitalize`}>{weatherDescription}</p>
              </div>

              <StatCards
                temperature={temperature}
                humidity={humidity}
                windSpeed={windSpeed}
                aqi={aqi}
                dark={dark}
              />

              <WeatherChart forecastData={forecastData} dark={dark} />

              <RecentTable searches={searchHistory} onCityClick={handleSearch} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
