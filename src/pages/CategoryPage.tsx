import React from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../components/Header'
import { podcasts } from '../data/mockPodcasts'
import { PodcastList } from '../components/PodcastList'
import type { Category } from '../types'

export const CategoryPage: React.FC = () => {
  const { name } = useParams<{ name: string }>()
  const filtered = podcasts.filter((p) => name ? p.category.includes(name as Category) : true)
  return (
    <main className="max-w-6xl mx-auto p-4">
      <Header />
      <div className="mt-4">
        <h2 className="font-semibold">Category: {name}</h2>
        <PodcastList podcasts={filtered} />
      </div>
    </main>
  )
}
