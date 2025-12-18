import React, { createContext, useContext, useRef, useState } from "react";
import type { Episode } from "../types";

interface PlayerState {
  current?: Episode;
  playing: boolean;
  currentTime: number;
  volume: number;
  play: (ep: Episode) => void;
  toggle: () => void;
  seek: (t: number) => void;
  setVolume: (v: number) => void;
}

const PlayerContext = createContext<PlayerState | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [current, setCurrent] = useState<Episode | undefined>(undefined);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  function play(ep: Episode) {
    if (!audioRef.current) audioRef.current = new Audio();
    if (current?.id !== ep.id) {
      audioRef.current.src = ep.audioUrl;
      setCurrentTime(0);
    }
    setCurrent(ep);
    audioRef.current.play();
    setPlaying(true);

    audioRef.current.ontimeupdate = () => setCurrentTime(audioRef.current?.currentTime ?? 0);
    audioRef.current.onended = () => setPlaying(false);
    audioRef.current.volume = volume;
  }

  function toggle() {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play();
      setPlaying(true);
    }
  }

  function seek(t: number) {
    if (!audioRef.current) return;
    audioRef.current.currentTime = t;
    setCurrentTime(t);
  }

  function setVol(v: number) {
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  }

  return (
    <PlayerContext.Provider value={{ current, playing, play, toggle, currentTime, seek, volume, setVolume: setVol }}>
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within PlayerProvider");
  return ctx;
}
