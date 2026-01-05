import React, { createContext, useContext } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { Podcast, Episode } from '../types'

export type LibraryState = {
  subscriptions: Podcast[]
  favorites: Episode[]
  history: Episode[]
}

const LibraryContext = createContext<{
  state: LibraryState
  addSubscription: (p: Podcast) => void
  removeSubscription: (id: string) => void
  addFavorite: (e: Episode) => void
  addHistory: (e: Episode) => void
}>({
  state: { subscriptions: [], favorites: [], history: [] },
  addSubscription: () => undefined,
  removeSubscription: () => undefined,
  addFavorite: () => undefined,
  addHistory: () => undefined
})

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useLocalStorage<LibraryState>('library', {
    subscriptions: [],
    favorites: [],
    history: []
  })

  const addSubscription = (p: Podcast) => {
    if (state.subscriptions.find(s => s.id === p.id)) return
    setState({ ...state, subscriptions: [...state.subscriptions, p] })
  }

  const removeSubscription = (id: string) => {
    setState({ ...state, subscriptions: state.subscriptions.filter(s => s.id !== id) })
  }

  const addFavorite = (e: Episode) => {
    if (state.favorites.find(f => f.id === e.id)) return
    setState({ ...state, favorites: [e, ...state.favorites] })
  }

  const addHistory = (e: Episode) => {
    setState({ ...state, history: [e, ...state.history].slice(0, 50) })
  }

  return (
    <LibraryContext.Provider value={{ state, addSubscription, removeSubscription, addFavorite, addHistory }}>
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibrary() {
  return useContext(LibraryContext)
}
