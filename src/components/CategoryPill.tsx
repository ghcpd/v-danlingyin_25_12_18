import React from 'react'

const CategoryPill: React.FC<{ name: string; onClick?: () => void }> = ({ name, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 bg-slate-100 text-sm rounded-full text-slate-700 hover:bg-slate-200"
      aria-label={`Filter by ${name}`}
    >
      {name}
    </button>
  )
}

export default CategoryPill
