import React from 'react';
import { HeroProps } from '../types/index';
import { Play } from 'lucide-react';
import { useLibrary } from '../context/LibraryContext';

export const Hero: React.FC<HeroProps> = ({ featuredPodcast, onPlay }) => {
  const { subscribe, isSubscribed } = useLibrary();
  const subscribed = isSubscribed(featuredPodcast.id);

  return (
    <div className="relative h-80 md:h-96 rounded-lg overflow-hidden mb-12">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `url(${featuredPodcast.coverImage})`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8">
        <div className="max-w-2xl">
          <div className="inline-block px-3 py-1 bg-primary-600 text-white rounded-full text-sm font-medium mb-4">
            Featured
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{featuredPodcast.title}</h2>
          <p className="text-gray-200 mb-4 line-clamp-2">{featuredPodcast.description}</p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => onPlay?.(featuredPodcast.id)}
              className="flex items-center justify-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
              aria-label={`Play ${featuredPodcast.title}`}
            >
              <Play size={20} className="fill-current" />
              <span>Play Latest</span>
            </button>
            <button
              onClick={() => (subscribed ? null : subscribe(featuredPodcast.id))}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                subscribed
                  ? 'bg-gray-700 text-white cursor-default'
                  : 'bg-white text-gray-900 hover:bg-gray-100'
              }`}
              aria-label={subscribed ? `Already subscribed to ${featuredPodcast.title}` : `Subscribe to ${featuredPodcast.title}`}
            >
              {subscribed ? '✓ Subscribed' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
