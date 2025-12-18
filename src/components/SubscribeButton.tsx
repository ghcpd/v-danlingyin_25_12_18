import React from 'react'
import { useLibrary } from '../context/LibraryContext'

export const SubscribeButton: React.FC<{ id: string }> = ({ id }) => {
  const { subscriptions, subscribe, unsubscribe } = useLibrary()
  const subscribed = subscriptions.includes(id)
  return (
    <button
      onClick={() => (subscribed ? unsubscribe(id) : subscribe(id))}
      aria-pressed={subscribed}
      className={`px-3 py-1 rounded-md ${subscribed ? 'bg-gray-200' : 'bg-primary text-white'}`}
    >
      {subscribed ? 'Subscribed' : 'Subscribe'}
    </button>
  )
}
