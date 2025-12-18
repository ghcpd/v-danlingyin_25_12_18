import React from 'react'

interface SubscribeButtonProps {
  subscribed: boolean;
  onClick: () => void;
}

export const SubscribeButton: React.FC<SubscribeButtonProps> = ({ subscribed, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={subscribed}
    className={`px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${subscribed ? 'bg-secondary text-white' : 'bg-primary text-white'} `}
  >
    {subscribed ? 'Subscribed' : 'Subscribe'}
  </button>
)
