import React, { createContext, useContext, useState, useEffect } from 'react';
import { LibraryState, HistoryItem } from '../types/index';

interface LibraryContextType {
  library: LibraryState;
  subscribe: (podcastId: string) => void;
  unsubscribe: (podcastId: string) => void;
  toggleFavorite: (episodeId: string) => void;
  addToHistory: (historyItem: HistoryItem) => void;
  isSubscribed: (podcastId: string) => boolean;
  isFavorite: (episodeId: string) => boolean;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

const LIBRARY_STORAGE_KEY = 'podcast-library';

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [library, setLibrary] = useState<LibraryState>(() => {
    const stored = localStorage.getItem(LIBRARY_STORAGE_KEY);
    return stored
      ? JSON.parse(stored)
      : {
          subscribed: [],
          favorites: [],
          history: [],
        };
  });

  // Save to localStorage whenever library changes
  useEffect(() => {
    localStorage.setItem(LIBRARY_STORAGE_KEY, JSON.stringify(library));
  }, [library]);

  const subscribe = (podcastId: string) => {
    setLibrary((prev) => ({
      ...prev,
      subscribed: prev.subscribed.includes(podcastId) ? prev.subscribed : [...prev.subscribed, podcastId],
    }));
  };

  const unsubscribe = (podcastId: string) => {
    setLibrary((prev) => ({
      ...prev,
      subscribed: prev.subscribed.filter((id) => id !== podcastId),
    }));
  };

  const toggleFavorite = (episodeId: string) => {
    setLibrary((prev) => ({
      ...prev,
      favorites: prev.favorites.includes(episodeId)
        ? prev.favorites.filter((id) => id !== episodeId)
        : [...prev.favorites, episodeId],
    }));
  };

  const addToHistory = (historyItem: HistoryItem) => {
    setLibrary((prev) => {
      const filtered = prev.history.filter((item) => item.episodeId !== historyItem.episodeId);
      return {
        ...prev,
        history: [historyItem, ...filtered].slice(0, 100), // Keep last 100
      };
    });
  };

  const isSubscribed = (podcastId: string): boolean => {
    return library.subscribed.includes(podcastId);
  };

  const isFavorite = (episodeId: string): boolean => {
    return library.favorites.includes(episodeId);
  };

  const value: LibraryContextType = {
    library,
    subscribe,
    unsubscribe,
    toggleFavorite,
    addToHistory,
    isSubscribed,
    isFavorite,
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
};

export const useLibrary = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (context === undefined) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};
