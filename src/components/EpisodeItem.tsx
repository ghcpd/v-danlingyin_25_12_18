import React from 'react'
import type { Episode } from '../types'
import { formatDuration } from '../utils/formatDuration'
import { usePlayer } from '../context/PlayerContext'

const EpisodeItem: React.FC<{ episode: Episode }> = ({ episode }) => {
  const { dispatch, state } = usePlayer()
  const isCurrent = state.current?.id === episode.id

  return (
    <div className="flex items-center justify-between p-3 border-b">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-slate-200 rounded-md overflow-hidden">
          {episode.thumbnail && <img src={episode.thumbnail} alt="" className="w-full h-full object-cover" />}
        </div>
        <div>
          <div className="text-sm font-semibold">{episode.title}</div>
          <div className="text-xs text-slate-500">{formatDuration(episode.duration)} • {new Date(episode.releaseDate).toLocaleDateString()}</div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          aria-label={isCurrent && state.isPlaying ? 'Pause' : 'Play'}
          onClick={() => {
            dispatch({ type: 'SET_CURRENT', payload: episode })
            dispatch({ type: 'PLAY' })
          }}
          className="px-3 py-1 bg-accent text-white rounded-md"
        >
          {isCurrent && state.isPlaying ? 'Pause' : 'Play'}
        </button>
        <button className="px-3 py-1 border rounded-md">Details</button>
      </div>
    </div>
  )
}

export default EpisodeItem
