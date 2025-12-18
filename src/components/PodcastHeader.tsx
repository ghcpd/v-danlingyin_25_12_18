import React from 'react';
import { Star } from 'lucide-react';
import { Podcast } from '../types/index';

interface PodcastHeaderProps {
  podcast: Podcast;
  isSubscribed: boolean;
  onSubscribe: () => void;
  onUnsubscribe: () => void;
  onPlayLatest?: () => void;
}

export const PodcastHeader: React.FC<PodcastHeaderProps> = ({
  podcast,
  isSubscribed,
  onSubscribe,
  onUnsubscribe,
  onPlayLatest,
}) => {
  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white rounded-lg p-8 mb-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cover Image */}
        <div className="w-full md:w-48 flex-shrink-0">
          <img
            src={podcast.coverImage}
            alt={podcast.title}
            className="w-full aspect-square object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-4">
            <div className="inline-block px-3 py-1 bg-primary-600 rounded-full text-sm font-medium mb-4">
              Podcast
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{podcast.title}</h1>
            <p className="text-xl text-gray-300 mb-4">{podcast.author}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6 py-6 border-y border-gray-700">
            <div>
              <p className="text-gray-400 text-sm">Episodes</p>
              <p className="text-2xl font-bold">{podcast.episodeCount}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Rating</p>
              <div className="flex items-center space-x-2">
                <Star size={20} className="fill-yellow-400 text-yellow-400" />
                <span className="text-2xl font-bold">{podcast.rating.toFixed(1)}</span>
              </div>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Subscribers</p>
              <p className="text-2xl font-bold">{(podcast.subscribers / 1000).toFixed(0)}K</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-lg mb-6">{podcast.description}</p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={isSubscribed ? onUnsubscribe : onSubscribe}
              className={`px-6 py-3 rounded-lg font-semibold transition ${
                isSubscribed
                  ? 'bg-gray-700 hover:bg-gray-600 text-white'
                  : 'bg-primary-600 hover:bg-primary-700 text-white'
              }`}
              aria-label={
                isSubscribed
                  ? `Unsubscribe from ${podcast.title}`
                  : `Subscribe to ${podcast.title}`
              }
            >
              {isSubscribed ? '✓ Subscribed' : 'Subscribe'}
            </button>
            <button
              onClick={onPlayLatest}
              className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition"
              aria-label={`Play latest episode from ${podcast.title}`}
            >
              Play Latest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
