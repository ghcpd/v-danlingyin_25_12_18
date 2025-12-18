import { Link } from 'react-router-dom';
import { Search, Library, Home } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary-600">
            PodcastApp
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <Link to="/search" className="text-gray-700 hover:text-primary-600 flex items-center">
              <Search className="w-4 h-4 mr-1" />
              Search
            </Link>
            <Link to="/library" className="text-gray-700 hover:text-primary-600 flex items-center">
              <Library className="w-4 h-4 mr-1" />
              Library
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <button className="md:hidden p-2">
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;