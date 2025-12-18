import { useContext, useCallback } from 'react';
import { PlayerContext, PlayerContextProps } from '@/context/PlayerContext';

export const useAudioPlayer = (): PlayerContextProps => {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('useAudioPlayer must be used within PlayerProvider');
  return ctx;
};
