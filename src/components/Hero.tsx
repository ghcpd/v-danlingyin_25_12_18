import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';
import { Podcast } from '../types';

interface HeroProps {
  featuredPodcast: Podcast;
}

const Hero = ({ featuredPodcast }: HeroProps) => {
  return (
    <section className="bg-gradient-to-r from-primary-500 to-primary-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Discover Your Next Favorite Podcast
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Explore thousands of podcasts across all categories
            </p>
            <Link 
              to={`/podcast/${featuredPodcast.id}`}
              className="inline-flex items-center px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              <Play className="w-5 h-5 mr-2" />
              Listen Now
            </Link>
          </div>
          
          <div className="lg:text-right">
            <img 
              src={featuredPodcast.coverImage} 
              alt={featuredPodcast.title}
              className="w-64 h-64 object-cover rounded-lg shadow-2xl mx-auto lg:mx-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;