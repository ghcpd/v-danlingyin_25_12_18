import React, { useMemo, useState } from 'react'
import type { Category } from '../types'
import { Header } from '../components/Header'
import { SearchBar } from '../components/SearchBar'
import { FilterPanel } from '../components/FilterPanel'
import { PodcastList } from '../components/PodcastList'
import { podcasts } from '../data/mockPodcasts'

export const SearchPage: React.FC = () => {
  const [q, setQ] = useState('')
  const [cat, setCat] = useState<Category | undefined>(undefined)

  const filtered = useMemo(() => {
    return podcasts.filter((p) => {
      const matchesQ = q === '' || p.title.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase())
      const matchesCat = !cat || p.category.includes(cat)
      return matchesQ && matchesCat
    })
  }, [q, cat])

  return (
    <main className="max-w-6xl mx-auto p-4">
      <Header />
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <SearchBar onSearch={setQ} />
          <div className="mt-3">
            <PodcastList podcasts={filtered} />
          </div>
        </div>
        <aside className="md:col-span-1">
          <FilterPanel selected={cat} onSelect={(c) => setCat(c as Category | undefined)} />
        </aside>
      </div>
    </main>
  )
}
