import { Thermometer, Droplets, Wind, Activity } from 'lucide-react';

interface StatCardsProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  aqi: number;
  dark?: boolean;
}

export default function StatCards({ temperature, humidity, windSpeed, aqi, dark = false }: StatCardsProps) {
  const getAQILabel = (aqi: number) => {
    if (aqi === 1) return 'Good';
    if (aqi === 2) return 'Fair';
    if (aqi === 3) return 'Moderate';
    if (aqi === 4) return 'Poor';
    return 'Very Poor';
  };

  const getAQIColor = (aqi: number) => {
    if (aqi === 1) return 'text-green-600 bg-green-50 dark:bg-green-900/20 dark:text-green-300';
    if (aqi === 2) return 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 dark:text-yellow-300';
    if (aqi === 3) return 'text-orange-600 bg-orange-50 dark:bg-orange-900/20 dark:text-orange-300';
    if (aqi === 4) return 'text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-300';
    return 'text-purple-600 bg-purple-50 dark:bg-purple-900/20 dark:text-purple-300';
  };

  const stats = [
    {
      icon: Thermometer,
      label: 'Temperature',
      value: `${Math.round(temperature)}°C`,
      color: 'text-red-600 bg-red-50 dark:bg-red-900/10 dark:text-red-300',
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${humidity}%`,
      color: 'text-blue-600 bg-blue-50 dark:bg-blue-900/10 dark:text-blue-300',
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${windSpeed} m/s`,
      color: 'text-cyan-600 bg-cyan-50 dark:bg-cyan-900/10 dark:text-cyan-300',
    },
    {
      icon: Activity,
      label: 'Air Quality',
      value: getAQILabel(aqi),
      color: getAQIColor(aqi),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className={`${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-lg shadow-sm border p-6`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`${dark ? 'text-gray-300' : 'text-gray-600'} text-sm font-medium mb-1`}>{stat.label}</p>
              <p className={`${dark ? 'text-gray-100' : 'text-gray-900'} text-2xl font-bold`}>{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
