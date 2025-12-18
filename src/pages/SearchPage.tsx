import React, { useMemo } from 'react';
import { SearchBar } from '../components/SearchBar';
import { FilterPanel } from '../components/FilterPanel';
import { PodcastCard } from '../components/PodcastCard';
import { EmptyState } from '../components/EmptyState';
import { usePlayer } from '../context/PlayerContext';
import { searchPodcasts, mockEpisodes } from '../data/mockPodcasts';
import { Category, SearchFilters } from '../types/index';

export const SearchPage: React.FC = () => {
  const [filters, setFilters] = React.useState<SearchFilters>({
    query: '',
    categories: [],
    minRating: undefined,
    sortBy: 'relevance',
  });
  const { playEpisode } = usePlayer();

  const results = useMemo(() => {
    let filtered = searchPodcasts(
      filters.query,
      filters.categories.length > 0 ? filters.categories : undefined,
      filters.minRating
    );

    // Sort
    if (filters.sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    } else if (filters.sortBy === 'recent') {
      filtered = [...filtered].reverse();
    }

    return filtered;
  }, [filters]);

  const handlePlayPodcast = (podcastId: string) => {
    const episodes = mockEpisodes.filter((e) => e.podcastId === podcastId);
    if (episodes.length > 0) {
      playEpisode(episodes[0], episodes);
    }
  };

  return (
    <main role="main" className="pb-32">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Search Podcasts</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <FilterPanel
              currentFilters={filters}
              onFilterChange={(newFilters) => setFilters({ ...filters, ...newFilters })}
            />
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-8">
              <SearchBar
                onSearch={(query) => setFilters({ ...filters, query })}
                placeholder="Search by podcast name, author, or topic..."
              />
            </div>

            {/* Results */}
            {results.length === 0 ? (
              <EmptyState
                title="No Podcasts Found"
                description={
                  filters.query
                    ? `No podcasts match "${filters.query}". Try adjusting your search or filters.`
                    : 'Try searching for a podcast or adjusting your filters.'
                }
                icon="🔍"
              />
            ) : (
              <>
                <p className="text-gray-600 mb-6">
                  Found <span className="font-semibold text-gray-900">{results.length}</span> podcast
                  {results.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((podcast) => (
                    <PodcastCard
                      key={podcast.id}
                      podcast={podcast}
                      onPlay={handlePlayPodcast}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
