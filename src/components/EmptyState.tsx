import React from 'react'

export const EmptyState: React.FC<{ title?: string; description?: string }> = ({ title = 'Nothing here', description = '' }) => {
  return (
    <div className="p-8 bg-white rounded-md text-center text-gray-600">
      <h4 className="font-semibold text-lg">{title}</h4>
      {description && <p className="mt-2">{description}</p>}
    </div>
  )
}
