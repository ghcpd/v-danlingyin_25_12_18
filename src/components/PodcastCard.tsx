import React from 'react';
import { Link } from 'react-router-dom';
import { Podcast } from '@/types';

interface PodcastCardProps {
  podcast: Podcast;
}

export const PodcastCard: React.FC<PodcastCardProps> = React.memo(({ podcast }) => {
  return (
    <Link to={`/podcast/${podcast.id}`} className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow bg-white dark:bg-gray-800">
      <img
        src={podcast.coverImage}
        alt={`${podcast.title} cover`}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 truncate">{podcast.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{podcast.author}</p>
        <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-300">
          <span className="mr-2" aria-label="Episodes count">{podcast.episodeCount} episodes</span>
          <span className="mr-2" aria-label="Subscribers">{podcast.subscribers.toLocaleString()} subs</span>
          <span aria-label="Rating">⭐{podcast.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
  );
});
