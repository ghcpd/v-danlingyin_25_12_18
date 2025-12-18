import React from 'react';

interface CategoryPillProps {
  name: string;
  onClick?: (name: string) => void;
  selected?: boolean;
}

export const CategoryPill: React.FC<CategoryPillProps> = ({ name, onClick, selected = false }) => {
  const handleClick = () => {
    if (onClick) onClick(name);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`px-3 py-1 rounded-full text-sm border border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${selected ? 'bg-primary text-white' : 'text-primary'} `}
      aria-pressed={selected}
    >
      {name}
    </button>
  );
};
