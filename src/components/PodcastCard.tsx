import { Link } from 'react-router-dom';
import { Star, Users } from 'lucide-react';
import { Podcast } from '../types';

interface PodcastCardProps {
  podcast: Podcast;
}

const PodcastCard = ({ podcast }: PodcastCardProps) => {
  return (
    <Link 
      to={`/podcast/${podcast.id}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 block"
    >
      <img 
        src={podcast.coverImage} 
        alt={podcast.title}
        className="w-full aspect-square object-cover rounded-lg mb-3"
      />
      <h3 className="font-semibold text-lg mb-1 truncate">{podcast.title}</h3>
      <p className="text-gray-600 text-sm mb-2 truncate">{podcast.author}</p>
      <p className="text-gray-500 text-xs mb-3 line-clamp-2">{podcast.description}</p>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Star className="w-4 h-4 text-yellow-400 mr-1" />
          {podcast.rating}
        </div>
        <div className="flex items-center">
          <Users className="w-4 h-4 mr-1" />
          {podcast.subscribers.toLocaleString()}
        </div>
      </div>
      
      <div className="mt-2 flex flex-wrap gap-1">
        {podcast.category.slice(0, 2).map(cat => (
          <span 
            key={cat} 
            className="text-xs bg-gray-100 px-2 py-1 rounded"
          >
            {cat}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default PodcastCard;