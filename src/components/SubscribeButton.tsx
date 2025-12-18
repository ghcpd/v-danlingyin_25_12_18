import React from 'react'
import { useLibrary } from '../context/LibraryContext'
import type { Podcast } from '../types'

const SubscribeButton: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
  const { state, addSubscription, removeSubscription } = useLibrary()
  const subs = state.subscriptions
  const isSubscribed = subs.some(s => s.id === podcast.id)

  return (
    <button
      aria-label={isSubscribed ? 'Unsubscribe' : 'Subscribe'}
      className={`px-3 py-1 rounded-md ${isSubscribed ? 'border' : 'bg-accent text-white'}`}
      onClick={() => (isSubscribed ? removeSubscription(podcast.id) : addSubscription(podcast))}
    >
      {isSubscribed ? 'Subscribed' : 'Subscribe'}
    </button>
  )
}

export default SubscribeButton
