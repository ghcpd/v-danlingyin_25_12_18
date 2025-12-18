import React from 'react'
import { useParams } from 'react-router-dom'
import { podcasts, episodes } from '../data/mockPodcasts'
import { Header } from '../components/Header'
import { PodcastHeader } from '../components/PodcastHeader'
import { EpisodeItem } from '../components/EpisodeItem'

export const PodcastDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const podcast = podcasts.find((p) => p.id === id)
  if (!podcast) return <div>Not found</div>
  const eps = episodes.filter((e) => e.podcastId === podcast.id).sort((a,b)=> b.episodeNumber - a.episodeNumber)

  return (
    <main role="main" className="max-w-4xl mx-auto p-4">
      <Header />
      <div className="mt-4">
        <PodcastHeader podcast={podcast} />
        <section className="mt-4">
          <h4 className="font-semibold">About</h4>
          <p className="text-gray-700">{podcast.description}</p>
        </section>
        <section className="mt-4">
          <h4 className="font-semibold">Episodes</h4>
          <div className="mt-2 bg-white rounded-md shadow">
            {eps.map((ep) => <EpisodeItem key={ep.id} ep={ep} />)}
          </div>
        </section>
      </div>
    </main>
  )
}
