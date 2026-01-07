import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import PodcastList from '../components/PodcastList';
import { mockPodcasts } from '../data/mockPodcasts';

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  
  const categoryPodcasts = useMemo(() => 
    mockPodcasts.filter(podcast => 
      podcast.category.some(cat => 
        cat.toLowerCase() === categoryName?.toLowerCase()
      )
    ), [categoryName]
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
        <p className="text-gray-600">
          Discover the best {categoryName?.toLowerCase()} podcasts
        </p>
      </div>
      
      <PodcastList podcasts={categoryPodcasts} />
      
      {categoryPodcasts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No podcasts found in this category</p>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;