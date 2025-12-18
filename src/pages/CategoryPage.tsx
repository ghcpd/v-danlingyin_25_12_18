import React from 'react'
import { useParams } from 'react-router-dom'
import PodcastList from '../components/PodcastList'
import { podcasts } from '../data/mockPodcasts'

const CategoryPage: React.FC = () => {
  const { name } = useParams()
  const filtered = podcasts.filter(p => p.category.includes(name as any))

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-xl font-semibold">Category: {name}</h1>
      <div className="mt-4">
        {filtered.length === 0 ? <div className="text-slate-600">No podcasts yet</div> : <PodcastList podcasts={filtered} />}
      </div>
    </div>
  )
}

export default CategoryPage
