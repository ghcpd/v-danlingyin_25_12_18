import React, { Suspense, lazy } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { PlayerProvider } from "./context/PlayerContext";
import { LibraryProvider } from "./context/LibraryContext";

const HomePage = lazy(() => import("./pages/HomePage"));
const PodcastDetailPage = lazy(() => import("./pages/PodcastDetailPage"));
const SearchPage = lazy(() => import("./pages/SearchPage"));
const LibraryPage = lazy(() => import("./pages/LibraryPage"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));

import Header from "./components/Header";
import GlobalAudioPlayer from "./components/GlobalAudioPlayer";

export default function App(): JSX.Element {
  return (
    <PlayerProvider>
      <LibraryProvider>
        <div className="min-h-screen pb-28">
          <Header />

          <main role="main" className="container mx-auto px-4 mt-8">
            <Suspense fallback={<div className="text-center py-20">Loading…</div>}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/podcast/:id" element={<PodcastDetailPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/category/:name" element={<CategoryPage />} />
                <Route path="*" element={<div className="py-20 text-center">Page not found — <Link to="/">Go home</Link></div>} />
              </Routes>
            </Suspense>
          </main>

          <GlobalAudioPlayer />
        </div>
      </LibraryProvider>
    </PlayerProvider>
  );
}
