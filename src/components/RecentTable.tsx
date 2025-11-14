import { MapPin, Clock } from 'lucide-react';

interface SearchHistory {
  id: string;
  city_name: string;
  country: string;
  temperature: number;
  weather_condition: string;
  searched_at: string;
}

interface RecentTableProps {
  searches: SearchHistory[];
  onCityClick: (city: string) => void;
}

export default function RecentTable({ searches, onCityClick }: RecentTableProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);

    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Searches</h2>

      {searches.length === 0 ? (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-2" />
          <p className="text-gray-500">No recent searches yet</p>
          <p className="text-sm text-gray-400">Search for a city to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Location
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Temperature
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Condition
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                  Time
                </th>
              </tr>
            </thead>
            <tbody>
              {searches.map((search) => (
                <tr
                  key={search.id}
                  className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => onCityClick(search.city_name)}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        {search.city_name}, {search.country}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-900">
                      {Math.round(search.temperature)}°C
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-gray-700 capitalize">
                      {search.weather_condition}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1 text-gray-500 text-sm">
                      <Clock className="w-4 h-4" />
                      <span>{formatTime(search.searched_at)}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
