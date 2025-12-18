import React from 'react'
import { usePlayer } from '../context/PlayerContext'

export const PlayButton: React.FC = () => {
  const { playing, togglePlay } = usePlayer()
  return (
    <button aria-label="Toggle play" onClick={togglePlay} className="px-3 py-2 bg-primary text-white rounded-md">
      {playing ? 'Pause' : 'Play'}
    </button>
  )
}
