import React from 'react'
import { Category } from '../types'

const categories = Object.values(Category)

const FilterPanel: React.FC<{ onCategory?: (c: string) => void }> = ({ onCategory }) => {
  return (
    <div className="p-3 border rounded-md">
      <div className="mb-2 font-semibold">Categories</div>
      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button key={c} onClick={() => onCategory && onCategory(c)} className="px-3 py-1 bg-slate-100 rounded-full text-sm">
            {c}
          </button>
        ))}
      </div>
    </div>
  )
}

export default FilterPanel
