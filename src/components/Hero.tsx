import React from 'react';
import { Link } from 'react-router-dom';
import { podcasts } from '@/data/mockPodcasts';

export const Hero: React.FC = () => {
  // pick a featured podcast (first one for simplicity)
  const featured = podcasts[0];

  return (
    <section className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-lg mb-8">
      <div className="max-w-3xl mx-auto flex flex-col md:flex-row items-center">
        <img src={featured.coverImage} alt={`${featured.title} cover`} className="w-48 h-48 rounded-md shadow-md mb-4 md:mb-0 md:mr-6" />
        <div>
          <h2 className="text-3xl font-semibold">Featured Podcast: {featured.title}</h2>
          <p className="mt-2 text-sm">{featured.description}</p>
          <Link
            to={`/podcast/${featured.id}`}
            className="mt-4 inline-block px-4 py-2 bg-white text-primary font-medium rounded hover:bg-gray-100 transition"
          >
            Listen Now
          </Link>
        </div>
      </div>
    </section>
  );
};
