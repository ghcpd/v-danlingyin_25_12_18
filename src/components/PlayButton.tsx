import { Play, Pause } from 'lucide-react';

interface PlayButtonProps {
  isPlaying: boolean;
  onClick: () => void;
  size?: 'sm' | 'md' | 'lg';
}

const PlayButton = ({ isPlaying, onClick, size = 'md' }: PlayButtonProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  };

  return (
    <button 
      onClick={onClick}
      className={`bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors flex items-center justify-center ${sizeClasses[size]}`}
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      {isPlaying ? <Pause className={iconSizes[size]} /> : <Play className={iconSizes[size]} />}
    </button>
  );
};

export default PlayButton;