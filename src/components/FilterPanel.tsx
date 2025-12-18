import React from 'react'
import { CategoryPill } from './CategoryPill'

const CATS = ['Technology','Business','Comedy','Education','Health','True Crime','News','Sports','Science','History'] as const

export const FilterPanel: React.FC<{ selected?: string, onSelect?: (c?: string) => void }> = ({ selected, onSelect }) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {CATS.map((c) => (
        <CategoryPill key={c} label={c} active={selected===c} onClick={() => onSelect?.(selected === c ? undefined : c)} />
      ))}
    </div>
  )
}
