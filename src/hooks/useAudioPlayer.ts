import { useEffect, useRef, useState } from 'react';
import { usePlayer } from '../context/PlayerContext';

export const useAudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const { playerState, setCurrentTime } = usePlayer();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (playerState.currentEpisode) {
      audio.src = playerState.currentEpisode.audioUrl;
    }
  }, [playerState.currentEpisode]);

  useEffect(() => {
    const audio = audioRef.current;

    if (playerState.isPlaying) {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
    } else {
      audio.pause();
    }
  }, [playerState.isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = playerState.volume;
  }, [playerState.volume]);

  useEffect(() => {
    const audio = audioRef.current;
    audio.currentTime = playerState.currentTime;
  }, [playerState.currentTime]);

  // Update current time on audio time update
  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [setCurrentTime]);

  return {
    audioRef,
    isLoading,
  };
};
