import React, { useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const debounced = useDebounce(value, 300);

  React.useEffect(() => {
    onSearch(debounced.trim());
  }, [debounced, onSearch]);

  return (
    <input
      type="text"
      placeholder="Search podcasts..."
      aria-label="Search podcasts"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
    />
  );
};
