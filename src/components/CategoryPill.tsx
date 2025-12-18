import React from 'react'

interface Props {
  label: string
  active?: boolean
  onClick?: () => void
}

export const CategoryPill: React.FC<Props> = ({ label, active = false, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full text-sm border ${active ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
      aria-pressed={active}
    >
      {label}
    </button>
  )
}
