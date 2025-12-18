import { useState } from 'react';
import { useLibrary } from '../context/LibraryContext';

interface SubscribeButtonProps {
  podcastId: string;
}

const SubscribeButton = ({ podcastId }: SubscribeButtonProps) => {
  const { state, dispatch } = useLibrary();
  const isSubscribed = state.subscribedPodcasts.includes(podcastId);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (isSubscribed) {
      dispatch({ type: 'UNSUBSCRIBE', payload: podcastId });
    } else {
      dispatch({ type: 'SUBSCRIBE', payload: podcastId });
    }
    setIsLoading(false);
  };

  return (
    <button 
      onClick={handleSubscribe}
      disabled={isLoading}
      className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
        isSubscribed 
          ? 'bg-gray-200 text-gray-700 hover:bg-gray-300' 
          : 'bg-primary-500 text-white hover:bg-primary-600'
      } disabled:opacity-50`}
    >
      {isLoading ? 'Loading...' : isSubscribed ? 'Subscribed' : 'Subscribe'}
    </button>
  );
};

export default SubscribeButton;