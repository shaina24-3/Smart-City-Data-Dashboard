export interface StoredSearch {
  id: string;
  city_name: string;
  country: string;
  temperature: number;
  weather_condition: string;
  searched_at: string;
}

const STORAGE_KEY = 'weather_searches';

export const saveSearch = (search: Omit<StoredSearch, 'id'>) => {
  const searches = getSearches();
  const newSearch: StoredSearch = {
    id: Date.now().toString(),
    ...search,
  };
  searches.unshift(newSearch);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(searches.slice(0, 20)));
};

export const getSearches = (): StoredSearch[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearSearches = () => {
  localStorage.removeItem(STORAGE_KEY);
};
