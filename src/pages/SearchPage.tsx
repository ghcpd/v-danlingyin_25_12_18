import { useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import SearchResults from '../components/SearchResults';
import { mockPodcasts } from '../data/mockPodcasts';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const filteredResults = useMemo(() => {
    let results = mockPodcasts;

    // Filter by search query
    if (query) {
      results = results.filter(podcast =>
        podcast.title.toLowerCase().includes(query.toLowerCase()) ||
        podcast.author.toLowerCase().includes(query.toLowerCase()) ||
        podcast.description.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      results = results.filter(podcast =>
        podcast.category.includes(selectedCategory)
      );
    }

    // Sort results
    results.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'recent':
          return b.episodeCount - a.episodeCount; // Using episodeCount as proxy for recency
        default:
          return 0; // relevance - keep original order
      }
    });

    return results;
  }, [query, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Search Podcasts</h1>
        <SearchBar onSearch={setQuery} />
      </div>
      
      <FilterPanel 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />
      
      <SearchResults 
        results={filteredResults}
        isLoading={false}
        query={query}
      />
    </div>
  );
};

export default SearchPage;