import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import GlobalAudioPlayer from './components/GlobalAudioPlayer';
import HomePage from './pages/HomePage';
import PodcastDetailPage from './pages/PodcastDetailPage';
import SearchPage from './pages/SearchPage';
import LibraryPage from './pages/LibraryPage';
import CategoryPage from './pages/CategoryPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pb-24"> {/* Space for fixed player */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/podcast/:id" element={<PodcastDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
        </Routes>
      </main>
      <GlobalAudioPlayer />
    </div>
  );
}

export default App;