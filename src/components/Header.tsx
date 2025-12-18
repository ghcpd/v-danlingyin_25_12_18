import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between" role="navigation">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-accent rounded-md flex items-center justify-center text-white font-bold">P</div>
          <div className="font-semibold">Podcast App</div>
        </Link>
        <nav className="hidden md:flex items-center gap-4">
          <Link to="/search" className="text-sm text-slate-700">Search</Link>
          <Link to="/library" className="text-sm text-slate-700">Library</Link>
        </nav>
        <div className="md:hidden">
          <button aria-label="Open menu" className="p-2 rounded-md focus:outline-none">☰</button>
        </div>
      </div>
    </header>
  )
}

export default Header
