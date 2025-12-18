import React from 'react';
import { Category, SearchFilters, FilterPanelProps } from '../types/index';

const CATEGORIES = Object.values(Category);

export const FilterPanel: React.FC<FilterPanelProps> = ({ onFilterChange, currentFilters }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Categories</label>
        <div className="space-y-2">
          {CATEGORIES.map((category) => (
            <label key={category} className="flex items-center">
              <input
                type="checkbox"
                checked={currentFilters.categories.includes(category)}
                onChange={(e) => {
                  const newCategories = e.target.checked
                    ? [...currentFilters.categories, category]
                    : currentFilters.categories.filter((c) => c !== category);
                  onFilterChange?.({ categories: newCategories });
                }}
                className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-600 cursor-pointer"
              />
              <span className="ml-2 text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-900 mb-3">Minimum Rating</label>
        <select
          value={currentFilters.minRating || ''}
          onChange={(e) => {
            const value = e.target.value ? parseFloat(e.target.value) : undefined;
            onFilterChange?.({ minRating: value });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
        >
          <option value="">All Ratings</option>
          <option value="3">3+ Stars</option>
          <option value="3.5">3.5+ Stars</option>
          <option value="4">4+ Stars</option>
          <option value="4.5">4.5+ Stars</option>
        </select>
      </div>

      {/* Sort */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-3">Sort By</label>
        <select
          value={currentFilters.sortBy}
          onChange={(e) => {
            onFilterChange?.({
              sortBy: e.target.value as 'relevance' | 'rating' | 'recent',
            });
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-primary-600 focus:outline-none"
        >
          <option value="relevance">Relevance</option>
          <option value="rating">Highest Rated</option>
          <option value="recent">Recently Added</option>
        </select>
      </div>
    </div>
  );
};
