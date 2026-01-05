import React from 'react'
import PodcastCard from './PodcastCard'
import type { Podcast } from '../types'

const PodcastList: React.FC<{ podcasts: Podcast[]; columns?: number }> = ({ podcasts }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {podcasts.map(p => (
        <PodcastCard podcast={p} key={p.id} />
      ))}
    </div>
  )
}

export default PodcastList
