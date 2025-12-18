import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search podcasts, episodes, authors...',
}) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    onSearch?.(debouncedQuery);
  }, [debouncedQuery, onSearch]);

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
        <Search size={20} />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg border border-gray-300 focus:border-primary-600 focus:bg-white focus:outline-none transition"
        aria-label="Search"
      />
    </div>
  );
};
