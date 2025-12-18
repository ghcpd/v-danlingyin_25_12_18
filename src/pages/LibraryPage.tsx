import { useState, useMemo } from 'react';
import LibraryTabs from '../components/LibraryTabs';
import PodcastList from '../components/PodcastList';
import EmptyState from '../components/EmptyState';
import { useLibrary } from '../context/LibraryContext';
import { mockPodcasts, mockEpisodes } from '../data/mockPodcasts';

const LibraryPage = () => {
  const { state } = useLibrary();
  const [activeTab, setActiveTab] = useState('subscribed');

  const subscribedPodcasts = useMemo(() => 
    mockPodcasts.filter(podcast => state.subscribedPodcasts.includes(podcast.id)), 
    [state.subscribedPodcasts]
  );

  const favoriteEpisodes = useMemo(() => 
    mockEpisodes.filter(episode => state.favorites.includes(episode.id)), 
    [state.favorites]
  );

  const historyEpisodes = useMemo(() => 
    mockEpisodes.filter(episode => state.history.includes(episode.id)), 
    [state.history]
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'subscribed':
        return subscribedPodcasts.length > 0 ? (
          <PodcastList podcasts={subscribedPodcasts} />
        ) : (
          <EmptyState 
            title="No subscriptions yet"
            description="Subscribe to podcasts to see them here"
            actionText="Browse Podcasts"
            actionLink="/"
          />
        );
      
      case 'favorites':
        return favoriteEpisodes.length > 0 ? (
          <div className="space-y-4">
            {favoriteEpisodes.map(episode => {
              const podcast = mockPodcasts.find(p => p.id === episode.podcastId);
              return (
                <div key={episode.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold">{episode.title}</h3>
                  <p className="text-gray-600">{podcast?.title}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState 
            title="No favorites yet"
            description="Mark episodes as favorites to see them here"
            actionText="Browse Episodes"
            actionLink="/"
          />
        );
      
      case 'history':
        return historyEpisodes.length > 0 ? (
          <div className="space-y-4">
            {historyEpisodes.map(episode => {
              const podcast = mockPodcasts.find(p => p.id === episode.podcastId);
              return (
                <div key={episode.id} className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="font-semibold">{episode.title}</h3>
                  <p className="text-gray-600">{podcast?.title}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState 
            title="No listening history"
            description="Your recently played episodes will appear here"
            actionText="Start Listening"
            actionLink="/"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">My Library</h1>
      
      <LibraryTabs activeTab={activeTab} onTabChange={setActiveTab} />
      
      {renderContent()}
    </div>
  );
};

export default LibraryPage;