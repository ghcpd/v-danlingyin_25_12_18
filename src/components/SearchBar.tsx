import React from 'react'

const SearchBar: React.FC<{ value: string; onChange: (v: string) => void }> = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <input
        aria-label="Search podcasts"
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-1 border rounded-md px-3 py-2"
        placeholder="Search podcasts, episodes, hosts..."
      />
    </div>
  )
}

export default SearchBar
