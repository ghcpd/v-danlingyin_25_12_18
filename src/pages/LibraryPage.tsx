import React, { useMemo } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import { podcasts, episodes } from '@/data/mockPodcasts';
import { PodcastList } from '@/components/PodcastList';
import { LibraryTabs } from '@/components/LibraryTabs';
import { EmptyState } from '@/components/EmptyState';
import { EpisodeItem } from '@/components/EpisodeItem';

const LibraryPage: React.FC = () => {
  const { subscriptions, favorites, history } = useLibrary();
  const [activeTab, setActiveTab] = React.useState<'subscriptions' | 'favorites' | 'history'>('subscriptions');

  const subscribedPodcasts = useMemo(() => podcasts.filter((p) => subscriptions.includes(p.id)), [subscriptions]);

  const favoriteEpisodes = useMemo(() => {
    return episodes.filter((e) => favorites.includes(e.id));
  }, [favorites, episodes]);

  const historyEpisodes = useMemo(() => {
    return history
      .map((id) => episodes.find((e) => e.id === id))
      .filter(Boolean) as typeof episodes;
  }, [history, episodes]);

  const getContent = () => {
    switch (activeTab) {
      case 'subscriptions':
        return subscribedPodcasts.length ? (
          <PodcastList podcasts={subscribedPodcasts} />
        ) : (
          <EmptyState message="No subscriptions yet" />
        );
      case 'favorites':
        return favoriteEpisodes.length ? (
          <div className="space-y-4">
            {favoriteEpisodes.map((e) => (
              <EpisodeItem key={e.id} episode={e} />
            ))}
          </div>
        ) : (
          <EmptyState message="No favorites yet" />
        );
      case 'history':
        return historyEpisodes.length ? (
          <div className="space-y-4">
            {historyEpisodes.map((e) => (
              <EpisodeItem key={e.id} episode={e} />
            ))}
          </div>
        ) : (
          <EmptyState message="No listening history yet" />
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold mb-4">My Library</h1>
      <LibraryTabs active={activeTab} onChange={setActiveTab} />
      {getContent()}
    </div>
  );
};

export default LibraryPage;
