import React from 'react';
import { Podcast } from '@/types';
import { PodcastList } from './PodcastList';
import { EmptyState } from './EmptyState';

interface SearchResultsProps {
  results: Podcast[];
}

export const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (results.length === 0) {
    return <EmptyState message="No results found" />;
  }

  return <PodcastList podcasts={results} />;
};
