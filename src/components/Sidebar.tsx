import { Home, Cloud, Map, Settings, TrendingUp } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Cloud, label: 'Weather', active: false },
    { icon: Map, label: 'Map', active: false },
    { icon: TrendingUp, label: 'Analytics', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <aside className="bg-white w-64 min-h-screen border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Cloud className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800">Smart City</span>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-900 mb-1">
            Weather Alerts
          </p>
          <p className="text-xs text-blue-700">
            Enable notifications for severe weather conditions
          </p>
        </div>
      </div>
    </aside>
  );
}
