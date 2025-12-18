import { Podcast } from '../types';
import PodcastList from './PodcastList';

interface SearchResultsProps {
  results: Podcast[];
  isLoading: boolean;
  query: string;
}

const SearchResults = ({ results, isLoading, query }: SearchResultsProps) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
        <p className="mt-4 text-gray-500">Searching...</p>
      </div>
    );
  }

  if (query && results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-2">No podcasts found for "{query}"</p>
        <p className="text-sm text-gray-400">Try adjusting your search terms</p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Start searching for podcasts</p>
      </div>
    );
  }

  return (
    <PodcastList 
      podcasts={results} 
      title={`Search Results${query ? ` for "${query}"` : ''}`} 
    />
  );
};

export default SearchResults;