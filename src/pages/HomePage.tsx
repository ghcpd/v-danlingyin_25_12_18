import React from 'react'
import { Header } from '../components/Header'
import { Hero } from '../components/Hero'
import { PodcastList } from '../components/PodcastList'
import { podcasts } from '../data/mockPodcasts'

export const HomePage: React.FC = () => {
  const featured = podcasts[0]
  const trending = podcasts.slice(0, 6)
  const categories = Array.from(new Set(podcasts.flatMap((p) => p.category)))
  const recently = [...podcasts].sort((a, b) => b.episodeCount - a.episodeCount).slice(0,6)

  return (
    <main role="main" className="max-w-6xl mx-auto p-4">
      <Header />
      <div className="mt-6 grid grid-cols-1 gap-6">
        <Hero podcast={featured} />
        <section>
          <h3 className="font-semibold mb-2">Trending Now</h3>
          <PodcastList podcasts={trending} />
        </section>
        <section>
          <h3 className="font-semibold mb-2">Categories</h3>
          <div className="flex gap-2 flex-wrap">
            {categories.map((c) => <div key={c} className="px-3 py-1 bg-gray-100 rounded-full text-sm">{c}</div>)}
          </div>
        </section>
        <section>
          <h3 className="font-semibold mb-2">Recently Added</h3>
          <PodcastList podcasts={recently} />
        </section>
      </div>
    </main>
  )
}
