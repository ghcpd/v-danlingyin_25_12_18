import React, { useState, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import { podcasts } from '../data/mockPodcasts'
import useDebounce from '../hooks/useDebounce'
import PodcastList from '../components/PodcastList'

const SearchPage: React.FC = () => {
  const [q, setQ] = useState('')
  const deb = useDebounce(q, 300)

  const results = useMemo(() => {
    if (!deb) return podcasts
    const s = deb.toLowerCase()
    return podcasts.filter(p => p.title.toLowerCase().includes(s) || p.author.toLowerCase().includes(s) || p.description.toLowerCase().includes(s))
  }, [deb])

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-xl font-semibold">Search</h1>
      <div className="mt-4">
        <SearchBar value={q} onChange={setQ} />
      </div>
      <div className="mt-4">
        <PodcastList podcasts={results} />
      </div>
    </div>
  )
}

export default SearchPage
