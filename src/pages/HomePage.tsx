import React from 'react'
import Hero from '../components/Hero'
import PodcastList from '../components/PodcastList'
import CategoryPill from '../components/CategoryPill'
import { podcasts } from '../data/mockPodcasts'

const categories = Array.from(new Set(podcasts.flatMap(p => p.category.map(c => String(c)))))

const HomePage: React.FC = () => {
  const trending = podcasts.slice(0, 8)
  const recent = podcasts.slice(0, 6)

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Hero />

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Trending Now</h2>
        <div className="mt-3">
          <PodcastList podcasts={trending} />
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Categories</h2>
        <div className="mt-3 flex gap-2 flex-wrap">
          {categories.map(c => <CategoryPill key={c} name={c} />)}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Recently Added</h2>
        <div className="mt-3">
          <PodcastList podcasts={recent} />
        </div>
      </section>
    </div>
  )
}

export default HomePage
