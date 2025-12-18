import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <header className="bg-primary text-white p-4 flex items-center justify-between" role="navigation">
      <Link to="/" className="text-2xl font-semibold">Podcast App</Link>
      <button
        className="md:hidden focus:outline-none"
        aria-label="Toggle menu"
        onClick={() => setOpen((o) => !o)}
      >
        {open ? '✕' : '☰'}
      </button>
      <nav
        className={`md:flex md:space-x-4 ${open ? 'block' : 'hidden'} w-full md:w-auto`}
      >
        <NavLink to="/" end className={({ isActive }) => isActive ? 'underline' : ''}>Home</NavLink>
        <NavLink to="/search" className={({ isActive }) => isActive ? 'underline' : ''}>Search</NavLink>
        <NavLink to="/library" className={({ isActive }) => isActive ? 'underline' : ''}>My Library</NavLink>
      </nav>
    </header>
  );
};
