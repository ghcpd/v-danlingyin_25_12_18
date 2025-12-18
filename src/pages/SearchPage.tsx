import React, { useMemo, useState } from 'react';
import { podcasts, episodes } from '@/data/mockPodcasts';
import { SearchBar } from '@/components/SearchBar';
import { FilterPanel } from '@/components/FilterPanel';
import { SearchResults } from '@/components/SearchResults';
import { Episode } from '@/types';

const SearchPage: React.FC = () => {
  const [term, setTerm] = useState('');
  const [filters, setFilters] = useState<{ categories: string[]; minDuration?: number; maxDuration?: number; minRating?: number; sortBy?: 'relevance' | 'rating' | 'recent' }>({ categories: [], sortBy: 'relevance' });

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const filtered = useMemo(() => {
    // compute filtered podcasts
    const filteredPodcasts = podcasts.filter((p) => {
      const matchesTerm = p.title.toLowerCase().includes(term.toLowerCase()) || p.author.toLowerCase().includes(term.toLowerCase());
      const matchesCategory = filters.categories.length === 0 || p.category.some((c) => filters.categories.includes(c));
      const matchesRating = filters.minRating ? p.rating >= filters.minRating : true;

      // duration filter: check if episodes of this podcast are within the specified range
      let matchesDuration = true;
      if ((filters.minDuration ?? null) !== null || (filters.maxDuration ?? null) !== null) {
        const podcastEpisodes = episodes.filter((e) => e.podcastId === p.id);
        if (podcastEpisodes.length) {
          const within = podcastEpisodes.some((e) => {
            const dur = e.duration;
            const min = filters.minDuration ?? -Infinity;
            const max = filters.maxDuration ?? Infinity;
            return dur >= min && dur <= max;
          });
          matchesDuration = within;
        }
      }

      return matchesTerm && matchesCategory && matchesRating && matchesDuration;
    });

    // apply sorting
    const sortBy = filters.sortBy ?? 'relevance';
    if (sortBy === 'rating') {
      return filteredPodcasts.slice().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    } else if (sortBy === 'recent') {
      // sort by most recent episode release date
      return filteredPodcasts.slice().sort((a, b) => {
        const aEpisodes = episodes.filter((e) => e.podcastId === a.id);
        const bEpisodes = episodes.filter((e) => e.podcastId === b.id);
        const aLatest = aEpisodes.reduce((max, e) => Math.max(max, new Date(e.releaseDate).getTime()), 0);
        const bLatest = bEpisodes.reduce((max, e) => Math.max(max, new Date(e.releaseDate).getTime()), 0);
        return bLatest - aLatest;
      });
    }
    // default: relevance (order as is)
    return filteredPodcasts;
  }, [term, filters]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="mb-4">
        <SearchBar onSearch={setTerm} />
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-1/4">
          <FilterPanel filters={filters} onChange={handleFilterChange} />
        </div>
        <div className="flex-1">
          <SearchResults results={filtered} />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
