import React from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { Episode } from '@/types';

interface PlayButtonProps {
  episode: Episode;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ episode }) => {
  const { currentEpisode, isPlaying, playEpisode, pause, resume } = usePlayer();

  const isCurrent = currentEpisode && currentEpisode.id === episode.id;

  const handleClick = () => {
    if (isCurrent) {
      isPlaying ? pause() : resume();
    } else {
      playEpisode(episode);
    }
  };

  return (
    <button
      type="button"
      aria-label={isCurrent && isPlaying ? 'Pause' : 'Play'}
      onClick={handleClick}
      className="p-2 rounded-full bg-primary text-white hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary/50"
    >
      {isCurrent && isPlaying ? '⏸' : '▶️'}
    </button>
  );
};
