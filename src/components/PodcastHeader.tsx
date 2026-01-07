import { Star, Users, Calendar } from 'lucide-react';
import { Podcast } from '../types';
import SubscribeButton from './SubscribeButton';

interface PodcastHeaderProps {
  podcast: Podcast;
}

const PodcastHeader = ({ podcast }: PodcastHeaderProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
      <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
        <img 
          src={podcast.coverImage} 
          alt={podcast.title}
          className="w-32 h-32 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2">{podcast.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{podcast.author}</p>
          
          <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 mr-1" />
              {podcast.rating}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {podcast.subscribers.toLocaleString()} subscribers
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {podcast.episodeCount} episodes
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {podcast.category.map(cat => (
              <span 
                key={cat} 
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {cat}
              </span>
            ))}
          </div>
          
          <SubscribeButton podcastId={podcast.id} />
        </div>
      </div>
      
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">About</h2>
        <p className="text-gray-700 leading-relaxed">{podcast.description}</p>
      </div>
    </div>
  );
};

export default PodcastHeader;