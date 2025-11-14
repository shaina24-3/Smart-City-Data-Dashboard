import { Thermometer, Droplets, Wind, Activity } from 'lucide-react';

interface StatCardsProps {
  temperature: number;
  humidity: number;
  windSpeed: number;
  aqi: number;
}

export default function StatCards({ temperature, humidity, windSpeed, aqi }: StatCardsProps) {
  const getAQILabel = (aqi: number) => {
    if (aqi === 1) return 'Good';
    if (aqi === 2) return 'Fair';
    if (aqi === 3) return 'Moderate';
    if (aqi === 4) return 'Poor';
    return 'Very Poor';
  };

  const getAQIColor = (aqi: number) => {
    if (aqi === 1) return 'text-green-600 bg-green-50';
    if (aqi === 2) return 'text-yellow-600 bg-yellow-50';
    if (aqi === 3) return 'text-orange-600 bg-orange-50';
    if (aqi === 4) return 'text-red-600 bg-red-50';
    return 'text-purple-600 bg-purple-50';
  };

  const stats = [
    {
      icon: Thermometer,
      label: 'Temperature',
      value: `${Math.round(temperature)}°C`,
      color: 'text-red-600 bg-red-50',
    },
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${humidity}%`,
      color: 'text-blue-600 bg-blue-50',
    },
    {
      icon: Wind,
      label: 'Wind Speed',
      value: `${windSpeed} m/s`,
      color: 'text-cyan-600 bg-cyan-50',
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
        <div key={stat.label} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
