import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PodcastCard } from '../components/PodcastCard';
import { EmptyState } from '../components/EmptyState';
import { usePlayer } from '../context/PlayerContext';
import { getPodcastsByCategory, mockEpisodes } from '../data/mockPodcasts';
import { Category } from '../types/index';

export const CategoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const navigate = useNavigate();
  const { playEpisode } = usePlayer();

  const category = useMemo(() => {
    if (!name) return null;
    const decoded = decodeURIComponent(name);
    return Object.values(Category).find((cat) => cat.toLowerCase() === decoded.toLowerCase()) || null;
  }, [name]);

  const podcasts = useMemo(() => {
    if (!category) return [];
    return getPodcastsByCategory(category);
  }, [category]);

  if (!category) {
    return (
      <main role="main" className="pb-32">
        <div className="container mx-auto px-4 py-8">
          <EmptyState
            title="Category Not Found"
            description="The category you're looking for doesn't exist."
            icon="📁"
            action={{
              label: 'Go Back Home',
              onClick: () => navigate('/'),
            }}
          />
        </div>
      </main>
    );
  }

  const handlePlayPodcast = (podcastId: string) => {
    const episodes = mockEpisodes.filter((e) => e.podcastId === podcastId);
    if (episodes.length > 0) {
      playEpisode(episodes[0], episodes);
    }
  };

  return (
    <main role="main" className="pb-32">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-12">
          <button
            onClick={() => navigate('/')}
            className="text-primary-600 hover:text-primary-700 font-medium mb-4"
            aria-label="Go back"
          >
            ← Back
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category}</h1>
          <p className="text-gray-600 text-lg">
            Explore all podcasts in the {category} category
          </p>
        </div>

        {/* Podcasts Grid */}
        {podcasts.length === 0 ? (
          <EmptyState
            title="No Podcasts Found"
            description={`There are no podcasts in the ${category} category yet.`}
            icon="🎙️"
            action={{
              label: 'Browse All Podcasts',
              onClick: () => navigate('/'),
            }}
          />
        ) : (
          <>
            <p className="text-gray-600 mb-6">
              Found <span className="font-semibold text-gray-900">{podcasts.length}</span> podcast
              {podcasts.length !== 1 ? 's' : ''}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {podcasts.map((podcast) => (
                <PodcastCard
                  key={podcast.id}
                  podcast={podcast}
                  onPlay={handlePlayPodcast}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};
