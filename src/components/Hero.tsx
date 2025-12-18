import React from 'react'
import { Podcast } from '../types'

export const Hero: React.FC<{ podcast: Podcast }> = ({ podcast }) => {
  return (
    <section aria-labelledby="featured" className="bg-gradient-to-r from-primary to-secondary text-white p-8 rounded-lg">
      <h2 id="featured" className="text-xl font-bold">Featured</h2>
      <div className="mt-4 flex gap-6 items-center">
        <img src={podcast.coverImage} alt="Featured cover" className="w-32 h-32 rounded-md object-cover" />
        <div>
          <h3 className="text-2xl font-semibold">{podcast.title}</h3>
          <p className="text-sm opacity-90">{podcast.description}</p>
        </div>
      </div>
    </section>
  )
}
