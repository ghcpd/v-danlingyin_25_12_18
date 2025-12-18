import { Podcast } from '../types';
import PodcastCard from './PodcastCard';

interface PodcastListProps {
  podcasts: Podcast[];
  title?: string;
}

const PodcastList = ({ podcasts, title }: PodcastListProps) => {
  if (podcasts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No podcasts found</p>
      </div>
    );
  }

  return (
    <div>
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {podcasts.map(podcast => (
          <PodcastCard key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  );
};

export default PodcastList;