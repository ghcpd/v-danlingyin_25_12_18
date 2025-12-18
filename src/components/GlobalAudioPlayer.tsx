import React, { useRef } from 'react';
import { usePlayer } from '@/context/PlayerContext';
import { formatDuration } from '@/utils/formatDuration';
// import { podcasts } from '@/data/mockPodcasts'; // Not used currently
import { VolumeControl } from './VolumeControl';

export const GlobalAudioPlayer: React.FC = () => {
  const { currentEpisode, isPlaying, pause, resume, seek, currentTime, duration, setVolume, volume, playNext, playPrev } = usePlayer();

  const progressRef = useRef<HTMLDivElement>(null);

  const handleProgressClick = (e: React.MouseEvent) => {
    if (!progressRef.current || !currentEpisode) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    seek(newTime);
  };

  if (!currentEpisode) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-3 flex items-center justify-between shadow-lg z-50"
      role="region"
      aria-label="Audio Player"
    >
      <div className="flex items-center space-x-3">
        <img src={currentEpisode.thumbnail || ''} alt="" className="w-12 h-12 object-cover rounded" />
        <div>
          <div className="font-semibold text-sm truncate max-w-xs" title={currentEpisode.title}>
            {currentEpisode.title}
          </div>
          <div className="text-xs text-gray-400 truncate max-w-xs">{currentEpisode.podcastId}</div>
        </div>
        <button
          onClick={isPlaying ? pause : resume}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="px-2 py-1 rounded bg-primary text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          {isPlaying ? '⏸' : '▶️'}
        </button>
        <button onClick={playPrev} aria-label="Previous" className="p-1 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50">
          {'⏮'}
        </button>
        <button onClick={playNext} aria-label="Next" className="p-1 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50">
          {'⏭'}
        </button>
      </div>
      <div className="flex-1 mx-4">
        <div
          ref={progressRef}
          className="h-2 bg-gray-700 rounded cursor-pointer relative"
          onClick={handleProgressClick}
        >
          <div
            className="h-2 bg-primary rounded absolute left-0 top-0"
            style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
          />
        </div>
        <div className="text-xs text-gray-300 mt-1 flex justify-between">
          <span>{formatDuration(Math.floor(currentTime))}</span>
          <span>{formatDuration(Math.floor(duration))}</span>
        </div>
      </div>
      <div>
        <VolumeControl volume={volume} onChange={setVolume} />
      </div>
    </div>
  );
};
