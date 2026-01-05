import React from 'react'
import { useLibrary } from '../context/LibraryContext'
import EmptyState from '../components/EmptyState'
import PodcastList from '../components/PodcastList'

const LibraryPage: React.FC = () => {
  const { state } = useLibrary()

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-xl font-semibold">My Library</h1>
      <section className="mt-4">
        <h2 className="font-semibold">Subscribed Podcasts</h2>
        {state.subscriptions.length === 0 ? <EmptyState title="No subscriptions" description="Subscribe to a podcast to see it here." /> : <PodcastList podcasts={state.subscriptions} />}
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">Favorites</h2>
        {state.favorites.length === 0 ? <EmptyState title="No favorites" /> : <div>{/* Could render episode list */}</div>}
      </section>

      <section className="mt-6">
        <h2 className="font-semibold">History</h2>
        {state.history.length === 0 ? <EmptyState title="No history" /> : <div>{/* Could render history list */}</div>}
      </section>
    </div>
  )
}

export default LibraryPage
