import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { PodcastHeader } from '../components/PodcastHeader';
import { EpisodeItem } from '../components/EpisodeItem';
import { EmptyState } from '../components/EmptyState';
import { usePlayer } from '../context/PlayerContext';
import { useLibrary } from '../context/LibraryContext';
import { mockPodcasts, mockEpisodes } from '../data/mockPodcasts';

export const PodcastDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { playEpisode } = usePlayer();
  const { subscribe, unsubscribe, isSubscribed } = useLibrary();

  const podcast = useMemo(() => {
    return mockPodcasts.find((p) => p.id === id);
  }, [id]);

  const episodes = useMemo(() => {
    return mockEpisodes.filter((e) => e.podcastId === id).sort((a, b) => b.episodeNumber - a.episodeNumber);
  }, [id]);

  const subscribed = podcast ? isSubscribed(podcast.id) : false;

  if (!podcast) {
    return (
      <main role="main" className="pb-32">
        <div className="container mx-auto px-4 py-8">
          <EmptyState
            title="Podcast Not Found"
            description="The podcast you're looking for doesn't exist."
            icon="🎙️"
            action={{
              label: 'Go Back Home',
              onClick: () => window.location.href = '/',
            }}
          />
        </div>
      </main>
    );
  }

  const handlePlayEpisode = (episodeId: string) => {
    const episode = episodes.find((e) => e.id === episodeId);
    if (episode) {
      playEpisode(episode, episodes);
    }
  };

  return (
    <main role="main" className="pb-32">
      <div className="container mx-auto px-4 py-8">
        {/* Podcast Header */}
        <PodcastHeader
          podcast={podcast}
          isSubscribed={subscribed}
          onSubscribe={() => subscribe(podcast.id)}
          onUnsubscribe={() => unsubscribe(podcast.id)}
          onPlayLatest={() => {
            if (episodes.length > 0) {
              playEpisode(episodes[0], episodes);
            }
          }}
        />

        {/* Episodes Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Episodes</h2>

          {episodes.length === 0 ? (
            <EmptyState
              title="No Episodes Found"
              description="This podcast doesn't have any episodes yet."
              icon="🎧"
            />
          ) : (
            <div className="space-y-4">
              {episodes.map((episode) => (
                <EpisodeItem
                  key={episode.id}
                  episode={episode}
                  podcast={podcast}
                  onPlay={() => handlePlayEpisode(episode.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
