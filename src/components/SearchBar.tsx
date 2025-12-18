import React, { useState } from 'react'
import { useDebounce } from '../hooks/useDebounce'

export const SearchBar: React.FC<{ onSearch: (q: string) => void }> = ({ onSearch }) => {
  const [q, setQ] = useState('')
  const debounced = useDebounce(q, 300)
  React.useEffect(() => {
    onSearch(debounced)
  }, [debounced, onSearch])

  return (
    <input
      aria-label="Search podcasts"
      value={q}
      onChange={(e) => setQ(e.target.value)}
      placeholder="Search podcasts"
      className="w-full p-2 border rounded-md"
    />
  )
}
