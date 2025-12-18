import React, { useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { podcasts, episodes } from '@/data/mockPodcasts';
import { PodcastHeader } from '@/components/PodcastHeader';
import { EpisodeItem } from '@/components/EpisodeItem';
import { usePlayer } from '@/context/PlayerContext';
import { useLibrary } from '@/context/LibraryContext';

const PodcastDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const podcast = useMemo(() => podcasts.find((p) => p.id === id), [id]);
  const podcastEpisodes = useMemo(() => episodes.filter((e) => e.podcastId === id), [id]);

  const { addToHistory } = useLibrary();
  const { playEpisode } = usePlayer();

  // automatically add to listening history when user plays an episode via play button in EpisodeItem
  // For demo, if route opens, we add most recent episode to history
  useEffect(() => {
    if (podcastEpisodes.length > 0) {
      addToHistory(podcastEpisodes[0].id);
    }
  }, [podcastEpisodes, addToHistory]);

  if (!podcast) {
    return <div className="p-4">Podcast not found</div>;
  }

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <PodcastHeader podcast={podcast} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{podcast.description}</p>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
        <div>
          {podcastEpisodes
            .slice()
            .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
            .map((e) => (
              <EpisodeItem key={e.id} episode={e} />
            ))}
        </div>
      </section>
    </div>
  );
};

export default PodcastDetailPage;
