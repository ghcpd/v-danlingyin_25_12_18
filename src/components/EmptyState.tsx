import React from 'react'

const EmptyState: React.FC<{ title?: string; description?: string }> = ({ title = 'Nothing here', description }) => {
  return (
    <div className="p-6 text-center text-slate-600">
      <div className="text-lg font-semibold">{title}</div>
      {description && <p className="mt-2">{description}</p>}
    </div>
  )
}

export default EmptyState
