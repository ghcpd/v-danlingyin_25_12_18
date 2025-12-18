import React from 'react';
import { Link } from 'react-router-dom';
import { podcasts, episodes } from '@/data/mockPodcasts';
import { Hero } from '@/components/Hero';
import { PodcastList } from '@/components/PodcastList';
import { CategoryPill } from '@/components/CategoryPill';

const HomePage: React.FC = () => {

  // Trending: pick 8 podcasts (for simplicity)
  const trending = podcasts.slice(0, 8);

  // Gather unique categories
  const uniqueCategories = Array.from(new Set(podcasts.flatMap((p) => p.category)));

  // Recently added: last 8
  const recentlyAdded = [...podcasts].reverse().slice(0, 8);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <Hero />

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Trending Now</h2>
        <PodcastList podcasts={trending} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-2">
          {uniqueCategories.map((cat) => (
            <Link key={cat} to={`/category/${encodeURIComponent(cat)}`}>
              <CategoryPill name={cat} />
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recently Added</h2>
        <PodcastList podcasts={recentlyAdded} />
      </section>
    </div>
  );
};

export default HomePage;
