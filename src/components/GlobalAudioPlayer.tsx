import { useState } from 'react';
import { Play, Pause, SkipBack, SkipForward, Minimize2, Maximize2 } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { formatDuration } from '../utils/formatters';
import ProgressBar from './ProgressBar';
import VolumeControl from './VolumeControl';

const GlobalAudioPlayer = () => {
  const { state, dispatch } = usePlayer();
  const { currentEpisode, isPlaying, currentTime, duration, volume } = state;
  const [isMinimized, setIsMinimized] = useState(false);

  if (!currentEpisode) return null;

  const handlePlayPause = () => {
    if (isPlaying) {
      dispatch({ type: 'PAUSE' });
    } else {
      dispatch({ type: 'PLAY' });
    }
  };

  const handleSeek = (time: number) => {
    dispatch({ type: 'SET_TIME', payload: time });
  };

  const handleVolumeChange = (vol: number) => {
    dispatch({ type: 'SET_VOLUME', payload: vol });
  };

  const handleSkip = (direction: 'forward' | 'backward') => {
    const skipAmount = 15; // 15 seconds
    const newTime = direction === 'forward' 
      ? Math.min(currentTime + skipAmount, duration)
      : Math.max(currentTime - skipAmount, 0);
    handleSeek(newTime);
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg transition-all duration-300 ${
      isMinimized ? 'h-16' : 'h-24'
    }`}>
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center">
        {/* Episode Info */}
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <img 
            src={currentEpisode.thumbnail || 'https://picsum.photos/60/60'} 
            alt={currentEpisode.title}
            className="w-12 h-12 rounded object-cover"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-sm font-medium truncate">{currentEpisode.title}</h4>
            <p className="text-xs text-gray-500 truncate">Podcast Name</p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => handleSkip('backward')}
              className="p-1 hover:bg-gray-100 rounded"
              aria-label="Skip backward 15 seconds"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            
            <button 
              onClick={handlePlayPause}
              className="p-2 bg-primary-500 text-white rounded-full hover:bg-primary-600"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            <button 
              onClick={() => handleSkip('forward')}
              className="p-1 hover:bg-gray-100 rounded"
              aria-label="Skip forward 15 seconds"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
          
          <div className="w-full flex items-center space-x-2">
            <span className="text-xs text-gray-500 w-10 text-right">
              {formatDuration(currentTime)}
            </span>
            <ProgressBar 
              currentTime={currentTime} 
              duration={duration} 
              onSeek={handleSeek}
            />
            <span className="text-xs text-gray-500 w-10">
              {formatDuration(duration)}
            </span>
          </div>
        </div>

        {/* Volume & Minimize */}
        <div className="flex items-center space-x-3 flex-1 justify-end">
          <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
          <button 
            onClick={() => setIsMinimized(!isMinimized)}
            className="p-1 hover:bg-gray-100 rounded"
            aria-label={isMinimized ? 'Expand player' : 'Minimize player'}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalAudioPlayer;