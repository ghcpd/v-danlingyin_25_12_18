import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import PodcastHeader from '../components/PodcastHeader';
import EpisodeItem from '../components/EpisodeItem';
import { mockPodcasts, mockEpisodes } from '../data/mockPodcasts';

const PodcastDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  
  const podcast = useMemo(() => 
    mockPodcasts.find(p => p.id === id), [id]
  );
  
  const podcastEpisodes = useMemo(() => 
    mockEpisodes.filter(ep => ep.podcastId === id), [id]
  );

  if (!podcast) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <p className="text-gray-500">Podcast not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PodcastHeader podcast={podcast} />
      
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Episodes</h2>
        <select className="border border-gray-300 rounded-md px-3 py-2">
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="popular">Most Popular</option>
        </select>
      </div>
      
      <div className="space-y-4">
        {podcastEpisodes.map(episode => (
          <EpisodeItem 
            key={episode.id} 
            episode={episode} 
            podcastTitle={podcast.title}
          />
        ))}
      </div>
      
      {podcastEpisodes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No episodes available</p>
        </div>
      )}
    </div>
  );
};

export default PodcastDetailPage;