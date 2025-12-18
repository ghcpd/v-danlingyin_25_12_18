import React from 'react'
import { Link } from 'react-router-dom'
import type { Podcast } from '../types'
import { format } from 'path'

const PodcastCard: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
  return (
    <article className="bg-white rounded-md shadow-sm overflow-hidden" aria-labelledby={`pod-${podcast.id}`}>
      <Link to={`/podcast/${podcast.id}`} className="block">
        <img src={podcast.coverImage} alt={`${podcast.title} cover`} className="w-full h-44 object-cover" />
        <div className="p-3">
          <h3 id={`pod-${podcast.id}`} className="text-sm font-semibold text-slate-900">
            {podcast.title}
          </h3>
          <p className="text-xs text-slate-600">{podcast.author}</p>
          <div className="mt-2 text-xs text-slate-500">
            {podcast.episodeCount} episodes • {podcast.subscribers.toLocaleString()} subs
          </div>
        </div>
      </Link>
    </article>
  )
}

export default React.memo(PodcastCard)
