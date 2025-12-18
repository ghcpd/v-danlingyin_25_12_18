import React, { createContext, useContext, useState, useEffect } from 'react';
import { Episode, PlayerState } from '../types/index';

interface PlayerContextType {
  playerState: PlayerState;
  playEpisode: (episode: Episode, queue?: Episode[]) => void;
  togglePlayPause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  nextEpisode: () => void;
  previousEpisode: () => void;
  setCurrentTime: (time: number) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentEpisode: null,
    isPlaying: false,
    currentTime: 0,
    volume: 0.7,
    queue: [],
    queueIndex: 0,
  });

  const playEpisode = (episode: Episode, queue: Episode[] = []) => {
    setPlayerState((prev) => ({
      ...prev,
      currentEpisode: episode,
      isPlaying: true,
      queue: queue.length > 0 ? queue : [episode],
      queueIndex: queue.length > 0 ? queue.findIndex((e) => e.id === episode.id) : 0,
      currentTime: 0,
    }));
  };

  const togglePlayPause = () => {
    setPlayerState((prev) => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  };

  const seek = (time: number) => {
    setPlayerState((prev) => ({
      ...prev,
      currentTime: time,
    }));
  };

  const setCurrentTime = (time: number) => {
    setPlayerState((prev) => ({
      ...prev,
      currentTime: time,
    }));
  };

  const setVolume = (volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setPlayerState((prev) => ({
      ...prev,
      volume: clampedVolume,
    }));
  };

  const nextEpisode = () => {
    setPlayerState((prev) => {
      if (prev.queue.length === 0) return prev;
      const nextIndex = (prev.queueIndex + 1) % prev.queue.length;
      return {
        ...prev,
        queueIndex: nextIndex,
        currentEpisode: prev.queue[nextIndex],
        currentTime: 0,
      };
    });
  };

  const previousEpisode = () => {
    setPlayerState((prev) => {
      if (prev.queue.length === 0) return prev;
      const prevIndex = (prev.queueIndex - 1 + prev.queue.length) % prev.queue.length;
      return {
        ...prev,
        queueIndex: prevIndex,
        currentEpisode: prev.queue[prevIndex],
        currentTime: 0,
      };
    });
  };

  const value: PlayerContextType = {
    playerState,
    playEpisode,
    togglePlayPause,
    seek,
    setVolume,
    nextEpisode,
    previousEpisode,
    setCurrentTime,
  };

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
};

export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
