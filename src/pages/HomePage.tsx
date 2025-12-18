import { useMemo } from 'react';
import Hero from '../components/Hero';
import CategoryPill from '../components/CategoryPill';
import PodcastList from '../components/PodcastList';
import { mockPodcasts } from '../data/mockPodcasts';
import { Category } from '../types';

const HomePage = () => {
  const featuredPodcast = mockPodcasts[0];
  
  const trendingPodcasts = useMemo(() => 
    mockPodcasts.slice(0, 8), []
  );
  
  const recentlyAdded = useMemo(() => 
    mockPodcasts.slice(8, 14), []
  );
  
  const categories = Object.values(Category);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Hero featuredPodcast={featuredPodcast} />
      
      <section className="py-12">
        <h2 className="text-2xl font-bold mb-6">Categories</h2>
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map(category => (
            <CategoryPill key={category} category={category} />
          ))}
        </div>
        
        <div className="space-y-12">
          <PodcastList 
            podcasts={trendingPodcasts} 
            title="Trending Now" 
          />
          
          <PodcastList 
            podcasts={recentlyAdded} 
            title="Recently Added" 
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;