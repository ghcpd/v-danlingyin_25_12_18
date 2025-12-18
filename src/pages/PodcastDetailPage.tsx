import React from 'react'
import { useParams } from 'react-router-dom'
import { podcasts, episodes } from '../data/mockPodcasts'
import EpisodeItem from '../components/EpisodeItem'
import SubscribeButton from '../components/SubscribeButton'

const PodcastDetailPage: React.FC = () => {
  const { id } = useParams()
  const pod = podcasts.find(p => p.id === id)

  if (!pod) return <div className="p-4">Podcast not found</div>

  const eps = episodes.filter(e => e.podcastId === pod.id).sort((a, b) => b.episodeNumber - a.episodeNumber)

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex gap-4 items-center">
        <img src={pod.coverImage} alt="cover" className="w-40 h-40 object-cover rounded-md" />
        <div>
          <h1 className="text-2xl font-bold">{pod.title}</h1>
          <div className="text-sm text-slate-600">{pod.author}</div>
          <div className="mt-2 text-sm">{pod.episodeCount} episodes • {pod.subscribers.toLocaleString()} subscribers</div>
          <div className="mt-3">
            <SubscribeButton podcast={pod} />
          </div>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">About</h2>
        <p className="mt-2 text-slate-700">{pod.description}</p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold">Episodes</h2>
        <div className="mt-2 border rounded-md overflow-hidden">
          {eps.map(e => <EpisodeItem key={e.id} episode={e} />)}
        </div>
      </section>
    </div>
  )
}

export default PodcastDetailPage
