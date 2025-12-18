import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { Episode } from '@/types';

export interface PlayerState {
  currentEpisode?: Episode;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Episode[];
}

export interface PlayerContextProps extends PlayerState {
  playEpisode: (episode: Episode, queue?: Episode[]) => void;
  pause: () => void;
  resume: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  playNext: () => void;
  playPrev: () => void;
}

const PlayerContext = createContext<PlayerContextProps | undefined>(undefined);

export const PlayerProvider = ({ children }: { children?: React.ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    queue: [],
  });

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTimeUpdate = () => {
      setState((s: PlayerState) => ({ ...s, currentTime: audio.currentTime }));
    };
    const onLoadedMetadata = () => {
      setState((s: PlayerState) => ({ ...s, duration: audio.duration }));
    };
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
    };
  }, [audioRef.current]);

  const playEpisode = (episode: Episode, queue: Episode[] = []) => {
    setState((s: PlayerState) => ({ ...s, currentEpisode: episode, isPlaying: true, queue }));
    if (audioRef.current) {
      audioRef.current.src = episode.audioUrl;
      audioRef.current.play();
    }
  };

  const pause = () => {
    setState((s: PlayerState) => ({ ...s, isPlaying: false }));
    audioRef.current?.pause();
  };

  const resume = () => {
    setState((s: PlayerState) => ({ ...s, isPlaying: true }));
    audioRef.current?.play();
  };

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setState((s: PlayerState) => ({ ...s, currentTime: time }));
    }
  };

  const setVolume = (volume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      setState((s: PlayerState) => ({ ...s, volume }));
    }
  };

  const playNext = () => {
    const getCurrentIndex = (queue: Episode[]) => queue.findIndex((ep: Episode) => ep.id === state.currentEpisode?.id);
    const currentIndex = getCurrentIndex(state.queue);
    const next = state.queue[currentIndex + 1];
    if (next) playEpisode(next, state.queue);
  };

  const playPrev = () => {
    const currentIndex = state.queue.findIndex((ep: Episode) => ep.id === state.currentEpisode?.id);
    const prev = state.queue[currentIndex - 1];
    if (prev) playEpisode(prev, state.queue);
  };

  return (
    <PlayerContext.Provider
      value={{
        ...state,
        playEpisode,
        pause,
        resume,
        seek,
        setVolume,
        playNext,
        playPrev,
      }}
    >
      {children}
      <audio ref={audioRef} hidden />
    </PlayerContext.Provider>
  );
};

export const usePlayer = (): PlayerContextProps => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider');
  return ctx;
};
