import React from 'react';

interface EmptyStateProps {
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message }) => (
  <div className="p-8 text-center text-gray-500">
    <p>{message}</p>
  </div>
);
