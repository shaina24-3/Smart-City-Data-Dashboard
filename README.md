# Smart-City-Data-Dashboard

A real-time Smart City Data Dashboard that fetches and visualizes publicly available data from open APIs across the world. This dashboard aggregates key smart-city indicators such as *air quality, **weather, **traffic density, **energy consumption, and **waste management*, making city analytics accessible and insightful.

🚀 Features
- *Real-time data fetching* from open APIs  
- *Interactive dashboards & visualizations*  
- *Modular data sources* – easily add more cities or APIs  
- API integrations for:
    - 🌫 Air Quality (e.g., OpenAQ API)
    - ☀ Weather (e.g., OpenWeather API)
    - 🚗 Traffic Density (city open data portals / Google Traffic APIs*)
    - 🔌 Energy Consumption (municipal open datasets)
    - 🗑 Waste Management (city data APIs)
- *Responsive UI* for desktop and mobile  
- *Extensible architecture* for additional smart-city metrics  

🏗 Tech Stack
| Category     | Tools                      |
| ------------ | -------------------------- |
| Frontend     | React + TypeScript         |
| Bundler      | Vite                       |
| Styling      | TailwindCSS                |
| Graphs       | Chart.js + react-chartjs-2 |
| Icons        | Lucide React               |
| Data Storage | LocalStorage               |
| APIs         | OpenWeather APIs           |


🔑 APIs Used

Located in: /src/api/openWeather.ts

1. Current Weather API
fetchWeather(city)

2. 5-Day / 3-Hour Forecast API
fetchForecast(lat, lon)

3.  Air Pollution API
fetchAirQuality(lat, lon)

📦 Installation
npm install
npm run dev

Add your OpenWeather API key in .env:
VITE_WEATHER_API_KEY=66c494bfa681df5e4fa4f3a80955a074

👥 Team Contribution
| **Member**   | **Contribution**                                                                 |
| ------------ | -------------------------------------------------------------------------------- |
| **Member 1** | API Integration & Weather Data Fetching (Current Weather, Forecast, Air Quality) |
| **Member 2** | Charts & UI Components (StatCards, WeatherChart, Dashboard Visuals)              |
| **Member 3** | UI Structure, Sidebar Navigation, Search History Module & Recent Searches Table  |

⭐ Why This Project?

This dashboard demonstrates:
Real-time API integration
Data visualization
Persistent storage
Modern frontend development
Clean and scalable component structure
Perfect for Smart City applications.
