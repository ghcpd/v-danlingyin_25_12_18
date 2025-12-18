import React from 'react'
import { Header } from '../components/Header'
import { LibraryTabs } from '../components/LibraryTabs'

export const LibraryPage: React.FC = () => {
  return (
    <main className="max-w-6xl mx-auto p-4">
      <Header />
      <div className="mt-4">
        <h2 className="font-semibold">My Library</h2>
        <LibraryTabs />
      </div>
    </main>
  )
}
