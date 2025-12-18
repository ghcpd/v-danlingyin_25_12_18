import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, ChevronUp, ChevronDown } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { ProgressBar } from './ProgressBar';
import { VolumeControl } from './VolumeControl';

export const GlobalAudioPlayer: React.FC = () => {
  const { playerState, togglePlayPause, seek, setVolume, nextEpisode, previousEpisode } = usePlayer();
  const { audioRef, isLoading } = useAudioPlayer();
  const [isExpanded, setIsExpanded] = useState(false);

  if (!playerState.currentEpisode) {
    return null;
  }

  const episode = playerState.currentEpisode;
  const duration = audioRef.current?.duration || 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} crossOrigin="anonymous" />

      {/* Compact Player */}
      <div className={`px-4 py-3 ${isExpanded ? 'hidden' : 'block'}`}>
        <div className="container mx-auto">
          {/* Progress Bar */}
          <div className="mb-3">
            <ProgressBar
              currentTime={playerState.currentTime}
              duration={duration}
              onSeek={seek}
            />
          </div>

          {/* Player Controls */}
          <div className="flex items-center justify-between gap-4">
            {/* Episode Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 line-clamp-1">{episode.title}</p>
              <p className="text-xs text-gray-600 line-clamp-1">{episode.description}</p>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={previousEpisode}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Previous episode"
                disabled={playerState.queue.length <= 1}
              >
                <SkipBack size={20} />
              </button>

              <button
                onClick={togglePlayPause}
                disabled={isLoading}
                className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition disabled:opacity-50"
                aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
              >
                {playerState.isPlaying ? (
                  <Pause size={24} className="fill-current" />
                ) : (
                  <Play size={24} className="fill-current" />
                )}
              </button>

              <button
                onClick={nextEpisode}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Next episode"
                disabled={playerState.queue.length <= 1}
              >
                <SkipForward size={20} />
              </button>

              <button
                onClick={() => setIsExpanded(true)}
                className="p-2 hover:bg-gray-100 rounded-lg transition ml-2"
                aria-label="Expand player"
              >
                <ChevronUp size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expanded Player */}
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-8 max-h-96 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Now Playing</h2>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
                aria-label="Collapse player"
              >
                <ChevronDown size={24} />
              </button>
            </div>

            {/* Album Art */}
            <div className="w-64 h-64 mx-auto mb-6 rounded-lg overflow-hidden bg-gray-200">
              <img
                src={episode.thumbnail || `https://picsum.photos/300/300?random=${episode.id}`}
                alt={episode.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Episode Info */}
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{episode.title}</h3>
              <p className="text-gray-600">{episode.description}</p>
            </div>

            {/* Progress */}
            <div className="mb-6">
              <ProgressBar
                currentTime={playerState.currentTime}
                duration={duration}
                onSeek={seek}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={previousEpisode}
                className="p-3 hover:bg-gray-100 rounded-full transition"
                aria-label="Previous episode"
                disabled={playerState.queue.length <= 1}
              >
                <SkipBack size={24} />
              </button>

              <button
                onClick={togglePlayPause}
                disabled={isLoading}
                className="p-4 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition disabled:opacity-50"
                aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
              >
                {playerState.isPlaying ? (
                  <Pause size={32} className="fill-current" />
                ) : (
                  <Play size={32} className="fill-current" />
                )}
              </button>

              <button
                onClick={nextEpisode}
                className="p-3 hover:bg-gray-100 rounded-full transition"
                aria-label="Next episode"
                disabled={playerState.queue.length <= 1}
              >
                <SkipForward size={24} />
              </button>
            </div>

            {/* Volume Control */}
            <div className="flex items-center justify-center">
              <VolumeControl
                volume={playerState.volume}
                onVolumeChange={setVolume}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
