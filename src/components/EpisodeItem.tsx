import { Play, Heart, Download } from 'lucide-react';
import { Episode } from '../types';
import { formatDuration, formatDate } from '../utils/formatters';
import { usePlayer } from '../context/PlayerContext';
import { useLibrary } from '../context/LibraryContext';

interface EpisodeItemProps {
  episode: Episode;
  podcastTitle: string;
}

const EpisodeItem = ({ episode, podcastTitle }: EpisodeItemProps) => {
  const { dispatch: playerDispatch } = usePlayer();
  const { state: libraryState, dispatch: libraryDispatch } = useLibrary();

  const isFavorite = libraryState.favorites.includes(episode.id);

  const handlePlay = () => {
    playerDispatch({ type: 'SET_EPISODE', payload: episode });
    playerDispatch({ type: 'PLAY' });
    libraryDispatch({ type: 'ADD_TO_HISTORY', payload: episode.id });
  };

  const handleFavorite = () => {
    if (isFavorite) {
      libraryDispatch({ type: 'REMOVE_FAVORITE', payload: episode.id });
    } else {
      libraryDispatch({ type: 'ADD_FAVORITE', payload: episode.id });
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <img 
          src={episode.thumbnail || 'https://picsum.photos/80/80'} 
          alt={episode.title}
          className="w-20 h-20 object-cover rounded"
        />
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg mb-1 truncate">{episode.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{podcastTitle}</p>
          <p className="text-gray-500 text-sm line-clamp-2 mb-3">{episode.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>{formatDuration(episode.duration)}</span>
              <span>{formatDate(episode.releaseDate)}</span>
              <span>Episode {episode.episodeNumber}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handlePlay}
                className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600"
                aria-label="Play episode"
              >
                <Play className="w-4 h-4" />
              </button>
              
              <button 
                onClick={handleFavorite}
                className={`p-2 rounded-full ${isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:bg-gray-100'}`}
                aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              
              <button 
                className="p-2 text-gray-400 hover:bg-gray-100 rounded-full"
                aria-label="Download episode"
              >
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeItem;