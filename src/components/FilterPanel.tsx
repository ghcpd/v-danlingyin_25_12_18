import React from 'react';
import { Category } from '@/types';

interface FilterPanelProps {
  filters: { categories: string[]; minDuration?: number; maxDuration?: number; minRating?: number };
  onChange: (filters: FilterPanelProps['filters']) => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onChange }) => {
  const handleCategoryToggle = (category: string) => {
    const exists = filters.categories.includes(category);
    const newCategories = exists
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];
    onChange({ ...filters, categories: newCategories });
  };

  const handleRatingChange = (rating: number) => {
    onChange({ ...filters, minRating: rating });
  };

  return (
    <div className="p-4 border rounded shadow-sm">
      <h3 className="font-semibold mb-2">Categories</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {(Object.values(Category) as string[]).map((cat) => (
          <label key={cat} className="flex items-center space-x-1">
            <input
              type="checkbox"
              checked={filters.categories.includes(cat)}
              onChange={() => handleCategoryToggle(cat)}
              className="form-checkbox h-4 w-4 text-primary"
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      <h3 className="font-semibold mb-2">Rating</h3>
      <div className="flex gap-2">
        {[5, 4, 3, 2, 1].map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => handleRatingChange(r)}
            className={`px-2 py-1 rounded border ${filters.minRating === r ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
          >
            {r}★ & up
          </button>
        ))}
      </div>
    </div>
  );
};
