import React from 'react'
import type { Podcast } from '../types'
import { useLibrary } from '../context/LibraryContext'

export const PodcastHeader: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
  const { subscriptions, subscribe, unsubscribe } = useLibrary()
  const subscribed = subscriptions.includes(podcast.id)
  return (
    <div className="flex gap-4 items-center">
      <img src={podcast.coverImage} alt="cover" className="w-32 h-32 rounded-md object-cover" />
      <div>
        <h1 className="text-2xl font-bold">{podcast.title}</h1>
        <p className="text-sm text-gray-600">{podcast.author}</p>
        <div className="mt-2 text-xs text-gray-600">{podcast.episodeCount} episodes • {podcast.subscribers} subs</div>
        <div className="mt-3">
          <button
            onClick={() => (subscribed ? unsubscribe(podcast.id) : subscribe(podcast.id))}
            className="px-3 py-1 rounded-md bg-primary text-white"
            aria-pressed={subscribed}
          >
            {subscribed ? 'Subscribed' : 'Subscribe'}
          </button>
        </div>
      </div>
    </div>
  )
}
