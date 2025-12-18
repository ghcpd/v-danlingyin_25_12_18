import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header(): JSX.Element {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center text-white font-bold">P</div>
          <div>
            <div className="font-bold">PodStation</div>
            <div className="text-xs text-gray-500">Listen. Learn. Repeat.</div>
          </div>
        </Link>

        <nav role="navigation" aria-label="main navigation" className="hidden md:flex gap-4 items-center">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "text-gray-600")}>Discover</NavLink>
          <NavLink to="/search" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "text-gray-600")}>Search</NavLink>
          <NavLink to="/library" className={({ isActive }) => (isActive ? "text-primary font-semibold" : "text-gray-600")}>Library</NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/search" className="text-sm text-gray-600 hidden sm:inline">Search podcasts</Link>
          <button aria-label="Open menu" className="p-2 rounded-md hover:bg-gray-100 md:hidden">☰</button>
        </div>
      </div>
    </header>
  );
}
