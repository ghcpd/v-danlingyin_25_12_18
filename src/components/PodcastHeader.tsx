import React from 'react';
import { Podcast } from '@/types';
import { useLibrary } from '@/context/LibraryContext';
import { SubscribeButton } from './SubscribeButton';

interface PodcastHeaderProps {
  podcast: Podcast;
}

export const PodcastHeader: React.FC<PodcastHeaderProps> = ({ podcast }) => {
  const { subscriptions, subscribe, unsubscribe } = useLibrary();
  const isSubscribed = subscriptions.includes(podcast.id);

  const handleSubscribe = () => {
    if (isSubscribed) unsubscribe(podcast.id);
    else subscribe(podcast.id);
  };

  return (
    <header className="flex items-center space-x-6 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <img src={podcast.coverImage} alt={`${podcast.title} cover`} className="w-32 h-32 object-cover rounded" />
      <div>
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100">{podcast.title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">by {podcast.author}</p>
        <div className="mt-4 flex items-center space-x-4">
          <SubscribeButton subscribed={isSubscribed} onClick={handleSubscribe} />
        </div>
      </div>
    </header>
  );
};
