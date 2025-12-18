import React, { useMemo } from 'react';
import { PodcastCard } from '../components/PodcastCard';
import { EmptyState } from '../components/EmptyState';
import { useLibrary } from '../context/LibraryContext';
import { usePlayer } from '../context/PlayerContext';
import { mockPodcasts, mockEpisodes } from '../data/mockPodcasts';

export const LibraryPage: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<'subscribed' | 'favorites' | 'history'>('subscribed');
  const { library } = useLibrary();
  const { playEpisode } = usePlayer();

  const subscribedPodcasts = useMemo(() => {
    return mockPodcasts.filter((p) => library.subscribed.includes(p.id));
  }, [library.subscribed]);

  const favoritePodcasts = useMemo(() => {
    const favoriteEpisodeIds = new Set(library.favorites);
    const podcastIds = new Set(
      mockEpisodes
        .filter((e) => favoriteEpisodeIds.has(e.id))
        .map((e) => e.podcastId)
    );
    return mockPodcasts.filter((p) => podcastIds.has(p.id));
  }, [library.favorites]);

  const historyPodcasts = useMemo(() => {
    const podcastIds = new Set(library.history.map((h) => h.podcastId));
    return mockPodcasts.filter((p) => podcastIds.has(p.id));
  }, [library.history]);

  const handlePlayPodcast = (podcastId: string) => {
    const episodes = mockEpisodes.filter((e) => e.podcastId === podcastId);
    if (episodes.length > 0) {
      playEpisode(episodes[0], episodes);
    }
  };

  return (
    <main role="main" className="pb-32">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">My Library</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          {(['subscribed', 'favorites', 'history'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-semibold border-b-2 transition ${
                activeTab === tab
                  ? 'text-primary-600 border-primary-600'
                  : 'text-gray-600 border-transparent hover:text-gray-900'
              }`}
              aria-selected={activeTab === tab}
              role="tab"
            >
              {tab === 'subscribed' && `Subscribed (${subscribedPodcasts.length})`}
              {tab === 'favorites' && `Favorites (${favoritePodcasts.length})`}
              {tab === 'history' && `History (${historyPodcasts.length})`}
            </button>
          ))}
        </div>

        {/* Content */}
        <div role="tabpanel">
          {activeTab === 'subscribed' && (
            <>
              {subscribedPodcasts.length === 0 ? (
                <EmptyState
                  title="No Subscriptions Yet"
                  description="Subscribe to your favorite podcasts to see them here."
                  icon="📻"
                  action={{
                    label: 'Browse Podcasts',
                    onClick: () => (window.location.href = '/'),
                  }}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {subscribedPodcasts.map((podcast) => (
                    <PodcastCard
                      key={podcast.id}
                      podcast={podcast}
                      onPlay={handlePlayPodcast}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'favorites' && (
            <>
              {favoritePodcasts.length === 0 ? (
                <EmptyState
                  title="No Favorite Podcasts Yet"
                  description="Mark episodes as favorites to see their podcasts here."
                  icon="❤️"
                  action={{
                    label: 'Explore Podcasts',
                    onClick: () => (window.location.href = '/search'),
                  }}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {favoritePodcasts.map((podcast) => (
                    <PodcastCard
                      key={podcast.id}
                      podcast={podcast}
                      onPlay={handlePlayPodcast}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'history' && (
            <>
              {historyPodcasts.length === 0 ? (
                <EmptyState
                  title="No Listening History"
                  description="Your recently played podcasts will appear here."
                  icon="🎧"
                  action={{
                    label: 'Start Listening',
                    onClick: () => (window.location.href = '/'),
                  }}
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {historyPodcasts.map((podcast) => (
                    <PodcastCard
                      key={podcast.id}
                      podcast={podcast}
                      onPlay={handlePlayPodcast}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};
