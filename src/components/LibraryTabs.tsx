import React from 'react'
import { useLibrary } from '../context/LibraryContext'
import { podcasts } from '../data/mockPodcasts'
import { PodcastList } from './PodcastList'

export const LibraryTabs: React.FC = () => {
  const { subscriptions, favorites } = useLibrary()
  const subscribed = podcasts.filter((p) => subscriptions.includes(p.id))
  const favs = podcasts.filter((p) => favorites.includes(p.id))

  return (
    <div>
      <h3 className="font-semibold">Subscribed Podcasts</h3>
      {subscribed.length === 0 ? <div className="text-gray-500">No subscriptions yet</div> : <PodcastList podcasts={subscribed} />}
      <h3 className="font-semibold mt-6">Favorites</h3>
      {favs.length === 0 ? <div className="text-gray-500">No favorites yet</div> : <PodcastList podcasts={favs} />}
    </div>
  )
}
