import React from 'react';
import { Heart, Play } from 'lucide-react';
import { EpisodeItemProps } from '../types/index';
import { formatDuration, formatCurrentTime } from '../utils/formatDuration';
import { formatDate } from '../utils/formatDate';
import { useLibrary } from '../context/LibraryContext';

export const EpisodeItem: React.FC<EpisodeItemProps> = ({
  episode,
  podcast,
  onPlay,
  isFavorite: isFavoriteProp,
  onToggleFavorite,
}) => {
  const { isFavorite, toggleFavorite } = useLibrary();
  const favorite = isFavorite(episode.id);

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg hover:bg-gray-50 transition group">
      {/* Thumbnail */}
      <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={episode.thumbnail || `https://picsum.photos/100/100?random=${episode.id}`}
          alt={episode.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-600">Episode {episode.episodeNumber}</p>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-600">
              {episode.title}
            </h3>
          </div>
        </div>
        <p className="text-sm text-gray-600 line-clamp-1 mb-2">{episode.description}</p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span>{formatDate(episode.releaseDate)}</span>
          <span>•</span>
          <span>{formatDuration(episode.duration)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex-shrink-0 flex items-center gap-2">
        <button
          onClick={() => toggleFavorite(episode.id)}
          className="p-2 hover:bg-gray-200 rounded-lg transition"
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={20}
            className={favorite ? 'fill-accent-500 text-accent-500' : 'text-gray-600'}
          />
        </button>
        <button
          onClick={() => onPlay?.(episode)}
          className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
          aria-label={`Play ${episode.title}`}
        >
          <Play size={20} className="fill-current" />
        </button>
      </div>
    </div>
  );
};
