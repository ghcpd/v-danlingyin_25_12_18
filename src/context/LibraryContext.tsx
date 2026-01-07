import React, { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface LibraryState {
  subscriptions: string[]; // podcast ids
  favorites: string[]; // episode ids
  history: string[]; // episode ids
  subscribe: (podId: string) => void;
  unsubscribe: (podId: string) => void;
  addFavorite: (epId: string) => void;
  removeFavorite: (epId: string) => void;
  addHistory: (epId: string) => void;
}

const LibraryContext = createContext<LibraryState | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [subscriptions, setSubscriptions] = useLocalStorage<string[]>("lib:subs", []);
  const [favorites, setFavorites] = useLocalStorage<string[]>("lib:favs", []);
  const [history, setHistory] = useLocalStorage<string[]>("lib:history", []);

  const subscribe = (podId: string) => setSubscriptions((s) => (s.includes(podId) ? s : [...s, podId]));
  const unsubscribe = (podId: string) => setSubscriptions((s) => s.filter((x) => x !== podId));
  const addFavorite = (epId: string) => setFavorites((f) => (f.includes(epId) ? f : [...f, epId]));
  const removeFavorite = (epId: string) => setFavorites((f) => f.filter((x) => x !== epId));
  const addHistory = (epId: string) => setHistory((h) => [epId, ...h.filter((x) => x !== epId)].slice(0, 100));

  return (
    <LibraryContext.Provider value={{ subscriptions, favorites, history, subscribe, unsubscribe, addFavorite, removeFavorite, addHistory }}>
      {children}
    </LibraryContext.Provider>
  );
};

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error("useLibrary must be used within LibraryProvider");
  return ctx;
}
