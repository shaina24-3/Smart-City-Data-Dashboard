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
    <aside className="bg-white dark:bg-gray-900 w-64 min-h-screen border-r border-gray-200 dark:border-gray-800 flex flex-col">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <Cloud className="w-8 h-8 text-blue-600" />
          <span className="text-xl font-bold text-gray-800 dark:text-gray-100">Smart City</span>
        </div>
      </div>

      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <button
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300'
                    : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <div className="bg-blue-50 dark:bg-blue-900/40 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
            Weather Alerts
          </p>
          <p className="text-xs text-blue-700 dark:text-blue-100">
            Enable notifications for severe weather conditions
          </p>
        </div>
      </div>
    </aside>
  );
}
