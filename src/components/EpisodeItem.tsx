import React from 'react';
import { Episode } from '@/types';
import { formatDuration } from '@/utils/formatDuration';
import { formatDate } from '@/utils/formatDate';
import { PlayButton } from './PlayButton';

interface EpisodeItemProps {
  episode: Episode;
}

export const EpisodeItem: React.FC<EpisodeItemProps> = React.memo(({ episode }) => {
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
      <div>
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {episode.episodeNumber}. {episode.title}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {formatDate(episode.releaseDate)} • {formatDuration(episode.duration)}
        </div>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{episode.description}</p>
      </div>
      <PlayButton episode={episode} />
    </div>
  );
});
