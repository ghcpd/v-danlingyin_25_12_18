import React from 'react'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm" role="navigation">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-md" aria-hidden="true" />
          <span className="font-semibold text-lg">Podcast</span>
        </Link>
        <nav className="hidden md:flex gap-4 items-center">
          <Link to="/search" className="text-sm text-gray-600 hover:text-primary">
            Search
          </Link>
          <Link to="/library" className="text-sm text-gray-600 hover:text-primary">
            Library
          </Link>
        </nav>
        <div className="md:hidden">
          <button aria-label="Open menu" className="p-2 rounded-md focus:outline-none focus:ring">☰</button>
        </div>
      </div>
    </header>
  )
}
