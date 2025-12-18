import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { podcasts } from '@/data/mockPodcasts';
import { PodcastList } from '@/components/PodcastList';
import { EmptyState } from '@/components/EmptyState';

const CategoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const decoded = name ? decodeURIComponent(name) : '';

  const filtered = useMemo(() => podcasts.filter((p) => p.category.includes(decoded)), [decoded]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">{decoded || 'Category'}</h1>
      {filtered.length ? <PodcastList podcasts={filtered} /> : <EmptyState message="No podcasts in this category" />}
    </div>
  );
};

export default CategoryPage;
