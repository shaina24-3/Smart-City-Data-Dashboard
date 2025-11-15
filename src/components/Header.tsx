import { useState } from 'react';
import { Search, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onSearch: (city: string) => void;
  onToggleTheme: () => void;
  dark?: boolean;
}

export default function Header({ onSearch, onToggleTheme, dark = false }: HeaderProps) {
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  return (
    <header className={`${dark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b px-6 py-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className={`${dark ? 'text-white' : 'text-gray-800'} text-2xl font-bold`}>Weather Dashboard</h1>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 max-w-xl mx-8">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for a city..."
              className={`${dark ? 'bg-gray-700 text-gray-200 placeholder-gray-400 border-gray-600' : 'bg-gray-50 text-gray-700 placeholder-gray-500 border-gray-300'} w-full px-4 py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            />
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${dark ? 'text-gray-300' : 'text-gray-400'}`} />
          </div>
        </form>

        <div className="flex items-center space-x-4">
          <span className={`${dark ? 'text-gray-300' : 'text-gray-600'} text-sm`}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>

          {/* Theme toggle */}
          <button
            onClick={onToggleTheme}
            className={`${dark ? 'bg-gray-700 text-yellow-300' : 'bg-gray-100 text-gray-700'} p-2 rounded-lg hover:opacity-90 transition`}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
