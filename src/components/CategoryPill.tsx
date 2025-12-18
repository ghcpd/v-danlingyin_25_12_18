import { Link } from 'react-router-dom';

interface CategoryPillProps {
  category: string;
  isActive?: boolean;
}

const CategoryPill = ({ category, isActive = false }: CategoryPillProps) => {
  return (
    <Link
      to={`/category/${encodeURIComponent(category)}`}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-primary-500 text-white' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {category}
    </Link>
  );
};

export default CategoryPill;