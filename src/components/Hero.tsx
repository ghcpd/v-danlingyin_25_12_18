import React from 'react'
import { Link } from 'react-router-dom'
import { podcasts } from '../data/mockPodcasts'

const Hero: React.FC = () => {
  const featured = podcasts[0]
  return (
    <section className="bg-gradient-to-r from-slate-50 to-white p-6 md:p-12 rounded-md">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold">{featured.title}</h1>
          <p className="mt-2 text-slate-600">{featured.description}</p>
          <div className="mt-4 flex gap-3">
            <Link to={`/podcast/${featured.id}`} className="px-4 py-2 bg-accent text-white rounded-md">Listen</Link>
            <button className="px-4 py-2 border rounded-md">More</button>
          </div>
        </div>
        <div className="hidden md:block">
          <img src={featured.coverImage} alt="featured" className="rounded-md shadow-md" />
        </div>
      </div>
    </section>
  )
}

export default Hero
