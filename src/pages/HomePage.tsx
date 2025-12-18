import React, { useMemo } from 'react';
import { Hero } from '../components/Hero';
import { PodcastCard } from '../components/PodcastCard';
import { CategoryPill } from '../components/CategoryPill';
import { usePlayer } from '../context/PlayerContext';
import { mockPodcasts, mockEpisodes, getTrendingPodcasts, getRecentlyAddedPodcasts } from '../data/mockPodcasts';
import { Category } from '../types/index';

const CATEGORIES = [Category.Technology, Category.Business, Category.Comedy, Category.Education, Category.Health, Category.News];

export const HomePage: React.FC = () => {
  const { playEpisode } = usePlayer();
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);

  const featured = mockPodcasts[0];
  const trending = useMemo(() => getTrendingPodcasts(8), []);
  const recentlyAdded = useMemo(() => getRecentlyAddedPodcasts(6), []);

  const filteredTrending = useMemo(() => {
    if (!selectedCategory) return trending;
    return trending.filter((p) => p.category.includes(selectedCategory));
  }, [trending, selectedCategory]);

  const handlePlayPodcast = (podcastId: string) => {
    const episodes = mockEpisodes.filter((e) => e.podcastId === podcastId);
    if (episodes.length > 0) {
      playEpisode(episodes[0], episodes);
    }
  };

  return (
    <main role="main" className="pb-32">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <Hero
          featuredPodcast={featured}
          onPlay={handlePlayPodcast}
        />

        {/* Categories Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Explore Categories</h2>
          <div className="flex flex-wrap gap-3">
            <CategoryPill
              category={Category.Technology}
              isActive={selectedCategory === Category.Technology}
              onClick={() => setSelectedCategory(selectedCategory === Category.Technology ? null : Category.Technology)}
            />
            {CATEGORIES.map((category) => (
              <CategoryPill
                key={category}
                category={category}
                isActive={selectedCategory === category}
                onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              />
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Trending Now</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTrending.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                onPlay={handlePlayPodcast}
              />
            ))}
          </div>
        </section>

        {/* Recently Added Section */}
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recently Added</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentlyAdded.map((podcast) => (
              <PodcastCard
                key={podcast.id}
                podcast={podcast}
                onPlay={handlePlayPodcast}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
