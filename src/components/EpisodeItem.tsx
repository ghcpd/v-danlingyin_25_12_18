import React from 'react'
import { formatDuration, formatDate } from '../utils'
import type { Episode } from '../types'
import { usePlayer } from '../context/PlayerContext'

export const EpisodeItem: React.FC<{ ep: Episode }> = ({ ep }) => {
  const { playEpisode } = usePlayer()
  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div>
        <div className="font-semibold">{ep.episodeNumber}. {ep.title}</div>
        <div className="text-sm text-gray-500">{formatDate(ep.releaseDate)} • {formatDuration(ep.duration)}</div>
      </div>
      <div className="flex items-center gap-2">
        <button aria-label={`Play ${ep.title}`} onClick={() => playEpisode(ep)} className="px-3 py-1 bg-primary text-white rounded-md">Play</button>
      </div>
    </div>
  )
}
