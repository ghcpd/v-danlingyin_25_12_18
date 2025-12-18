import React, { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { Podcast, Episode } from '@/types';

export interface LibraryState {
  subscriptions: string[]; // array of podcast ids
  favorites: string[]; // array of episode ids
  history: string[]; // array of episode ids (recent first)
}

export interface LibraryContextProps extends LibraryState {
  subscribe: (podcastId: string) => void;
  unsubscribe: (podcastId: string) => void;
  toggleFavorite: (episodeId: string) => void;
  addToHistory: (episodeId: string) => void;
}

const LibraryContext = createContext<LibraryContextProps | undefined>(undefined);

const STORAGE_KEY = 'podcast-library-state';

export const LibraryProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, setState] = useState<LibraryState>({ subscriptions: [], favorites: [], history: [] });

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setState(JSON.parse(stored));
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const subscribe = (podcastId: string) => {
    setState((s: LibraryState) => ({ ...s, subscriptions: Array.from(new Set([...s.subscriptions, podcastId])) }));
  };

  const unsubscribe = (podcastId: string) => {
    setState((s: LibraryState) => ({ ...s, subscriptions: s.subscriptions.filter((id) => id !== podcastId) }));
  };

  const toggleFavorite = (episodeId: string) => {
    setState((s: LibraryState) => {
      const exists = s.favorites.includes(episodeId);
      return { ...s, favorites: exists ? s.favorites.filter((id) => id !== episodeId) : [...s.favorites, episodeId] };
    });
  };

  const addToHistory = (episodeId: string) => {
    setState((s: LibraryState) => {
      const filtered = s.history.filter((id) => id !== episodeId);
      return { ...s, history: [episodeId, ...filtered].slice(0, 100) };
    });
  };

  return (
    <LibraryContext.Provider value={{ ...state, subscribe, unsubscribe, toggleFavorite, addToHistory }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = (): LibraryContextProps => {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider');
  return ctx;
};
