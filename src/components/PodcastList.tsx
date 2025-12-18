import React from 'react';
import { Podcast } from '@/types';
import { PodcastCard } from './PodcastCard';

interface PodcastListProps {
  podcasts: Podcast[];
  columns?: number;
}

export const PodcastList: React.FC<PodcastListProps> = ({ podcasts, columns = 4 }) => {
  // responsive grid using Tailwind classes for different breakpoints
  const gridClass = `grid gap-6 ${
    columns >= 4 ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3'
  }`;

  return <div className={gridClass}>{podcasts.map((p) => <PodcastCard key={p.id} podcast={p} />)}</div>;
};
