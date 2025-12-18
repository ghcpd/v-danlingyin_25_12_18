import React from 'react';
import { Heart, Play } from 'lucide-react';
import { PodcastCardProps } from '../types/index';
import { useLibrary } from '../context/LibraryContext';

export const PodcastCard: React.FC<PodcastCardProps> = React.memo(
  ({ podcast, onPlay, onSubscribe }) => {
    const { isSubscribed, subscribe, unsubscribe } = useLibrary();
    const subscribed = isSubscribed(podcast.id);

    return (
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden h-full flex flex-col">
        {/* Cover Image */}
        <div className="relative aspect-square bg-gray-200 overflow-hidden group">
          <img
            src={podcast.coverImage}
            alt={podcast.title}
            className="w-full h-full object-cover group-hover:scale-105 transition"
            loading="lazy"
          />
          {/* Play Button */}
          <button
            onClick={() => onPlay?.(podcast.id)}
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition rounded-lg"
            aria-label={`Play ${podcast.title}`}
          >
            <Play size={48} className="text-white opacity-0 group-hover:opacity-100 transition fill-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 mb-1">{podcast.title}</h3>
          <p className="text-sm text-gray-600 mb-3">{podcast.author}</p>

          {/* Stats */}
          <div className="flex items-center space-x-4 text-xs text-gray-500 mb-4">
            <span>⭐ {podcast.rating.toFixed(1)}</span>
            <span>📻 {podcast.episodeCount} episodes</span>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={() => (subscribed ? unsubscribe(podcast.id) : subscribe(podcast.id))}
            className={`w-full py-2 px-4 rounded-lg font-medium transition ${
              subscribed
                ? 'bg-secondary-600 text-white hover:bg-secondary-700'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
            aria-label={subscribed ? `Unsubscribe from ${podcast.title}` : `Subscribe to ${podcast.title}`}
          >
            {subscribed ? '✓ Subscribed' : 'Subscribe'}
          </button>
        </div>
      </div>
    );
  }
);

PodcastCard.displayName = 'PodcastCard';
