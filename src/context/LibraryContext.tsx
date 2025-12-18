import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Podcast } from '../types'

interface LibraryState {
  subscriptions: string[]
  favorites: string[]
  subscribe: (id: string) => void
  unsubscribe: (id: string) => void
  toggleFavorite: (id: string) => void
}

const LibraryContext = createContext<LibraryState | undefined>(undefined)

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useLocalStorage<string[]>('subs', [])
  const [favorites, setFavorites] = useLocalStorage<string[]>('favs', [])

  function subscribe(id: string) {
    setSubscriptions((s) => (s.includes(id) ? s : [...s, id]))
  }

  function unsubscribe(id: string) {
    setSubscriptions((s) => s.filter((x) => x !== id))
  }

  function toggleFavorite(id: string) {
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]))
  }

  return (
    <LibraryContext.Provider value={{ subscriptions, favorites, subscribe, unsubscribe, toggleFavorite }}>
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibrary() {
  const c = useContext(LibraryContext)
  if (!c) throw new Error('useLibrary must be used within LibraryProvider')
  return c
}
