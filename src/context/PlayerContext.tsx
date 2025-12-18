import React, { createContext, useContext, useRef, useState } from 'react'
import type { Episode } from '../types'

interface PlayerState {
  current?: Episode
  playing: boolean
  queue: Episode[]
  playEpisode: (ep: Episode) => void
  togglePlay: () => void
  playNext: () => void
  playPrev: () => void
}

const PlayerContext = createContext<PlayerState | undefined>(undefined)

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [current, setCurrent] = useState<Episode | undefined>(undefined)
  const [playing, setPlaying] = useState(false)
  const [queue, setQueue] = useState<Episode[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function playEpisode(ep: Episode) {
    setCurrent(ep)
    setPlaying(true)
    setQueue((q) => [ep, ...q.filter((x) => x.id !== ep.id)])
    if (audioRef.current) {
      audioRef.current.src = ep.audioUrl
      audioRef.current.play().catch(() => {
        /* ignore */
      })
    }
  }

  function togglePlay() {
    setPlaying((p) => {
      const next = !p
      if (audioRef.current) {
        next ? audioRef.current.play().catch(() => {}) : audioRef.current.pause()
      }
      return next
    })
  }

  function playNext() {
    if (!current) return
    const idx = queue.findIndex((q) => q.id === current.id)
    const next = queue[idx + 1]
    if (next) playEpisode(next)
  }

  function playPrev() {
    if (!current) return
    const idx = queue.findIndex((q) => q.id === current.id)
    const prev = queue[idx - 1]
    if (prev) playEpisode(prev)
  }

  return (
    <PlayerContext.Provider value={{ current, playing, queue, playEpisode, togglePlay, playNext, playPrev }}>
      {children}
      <audio ref={audioRef} />
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const c = useContext(PlayerContext)
  if (!c) throw new Error('usePlayer must be used within PlayerProvider')
  return c
}
