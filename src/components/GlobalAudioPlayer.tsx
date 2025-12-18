import React, { useEffect, useState } from 'react'
import { usePlayer } from '../context/PlayerContext'
import { formatDuration } from '../utils/formatDuration'

export const GlobalAudioPlayer: React.FC = () => {
  const { current, playing, togglePlay, playNext, playPrev } = usePlayer()
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = document.querySelector('audio') as HTMLAudioElement | null
    if (!audio) return
    function onTime() {
      setProgress(audio.currentTime)
      setDuration(audio.duration || 0)
    }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', playNext)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', playNext)
    }
  }, [playNext])

  if (!current) return null

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md px-4 py-2 w-full max-w-3xl flex items-center gap-4" role="region" aria-live="polite">
      <img src={current.thumbnail} alt="thumb" className="w-12 h-12 rounded-md object-cover" />
      <div className="flex-1">
        <div className="font-semibold">{current.title}</div>
        <div className="text-sm text-gray-500">{formatDuration(Math.floor(progress))} / {formatDuration(Math.floor(duration))}</div>
      </div>
      <div className="flex items-center gap-2">
        <button aria-label="Previous" onClick={playPrev} className="p-2">⏮</button>
        <button aria-label="Play/Pause" onClick={togglePlay} className="p-2">
          {playing ? '⏸' : '▶️'}
        </button>
        <button aria-label="Next" onClick={playNext} className="p-2">⏭</button>
      </div>
    </div>
  )
}
