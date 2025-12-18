import React, { Suspense } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PodcastDetailPage from './pages/PodcastDetailPage'
import SearchPage from './pages/SearchPage'
import LibraryPage from './pages/LibraryPage'
import CategoryPage from './pages/CategoryPage'
import Header from './components/Header'
import GlobalAudioPlayer from './components/GlobalAudioPlayer'

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1" role="main">
        <Suspense fallback={<div className="p-4">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/podcast/:id" element={<PodcastDetailPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/category/:name" element={<CategoryPage />} />
          </Routes>
        </Suspense>
      </main>
      <GlobalAudioPlayer />
    </div>
  )
}

export default App
