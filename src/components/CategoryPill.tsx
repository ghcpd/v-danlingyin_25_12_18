import React from 'react';
import { Category } from '../types/index';

interface CategoryPillProps {
  category: Category;
  isActive?: boolean;
  onClick?: (category: Category) => void;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ category, isActive = false, onClick }) => {
  return (
    <button
      onClick={() => onClick?.(category)}
      className={`px-4 py-2 rounded-full font-medium transition whitespace-nowrap ${
        isActive
          ? 'bg-primary-600 text-white'
          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
      }`}
      aria-pressed={isActive}
    >
      {category}
    </button>
  );
};
