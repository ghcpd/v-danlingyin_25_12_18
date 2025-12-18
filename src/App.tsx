import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PlayerProvider } from './context/PlayerContext'
import { LibraryProvider } from './context/LibraryContext'
import { GlobalAudioPlayer } from './components/GlobalAudioPlayer'

const HomePage = React.lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })))
const PodcastDetailPage = React.lazy(() => import('./pages/PodcastDetailPage').then(m => ({ default: m.PodcastDetailPage })))
const SearchPage = React.lazy(() => import('./pages/SearchPage').then(m => ({ default: m.SearchPage })))
const LibraryPage = React.lazy(() => import('./pages/LibraryPage').then(m => ({ default: m.LibraryPage })))
const CategoryPage = React.lazy(() => import('./pages/CategoryPage').then(m => ({ default: m.CategoryPage })))

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PlayerProvider>
        <LibraryProvider>
          <Suspense fallback={<div className="p-4">Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/podcast/:id" element={<PodcastDetailPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/category/:name" element={<CategoryPage />} />
            </Routes>
          </Suspense>
          <GlobalAudioPlayer />
        </LibraryProvider>
      </PlayerProvider>
    </BrowserRouter>
  )
}

export default App
