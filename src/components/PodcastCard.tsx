import React from 'react'
import { Podcast } from '../types'
import { Link } from 'react-router-dom'

interface Props {
  podcast: Podcast
}

export const PodcastCard: React.FC<Props> = React.memo(({ podcast }) => {
  return (
    <article className="bg-white rounded-lg shadow p-4" role="article">
      <Link to={`/podcast/${podcast.id}`} className="flex gap-4 items-center">
        <img src={podcast.coverImage} alt={`${podcast.title} cover`} className="w-20 h-20 rounded-md object-cover" />
        <div className="flex-1">
          <h4 className="font-semibold">{podcast.title}</h4>
          <p className="text-sm text-gray-500">{podcast.author}</p>
          <div className="mt-2 text-xs text-gray-600">{podcast.episodeCount} episodes • {podcast.rating} ⭐</div>
        </div>
      </Link>
    </article>
  )
})
