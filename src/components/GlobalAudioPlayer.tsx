import React, { useEffect, useState } from 'react'
import { usePlayer } from '../context/PlayerContext'
import { formatDuration } from '../utils/formatDuration'

const GlobalAudioPlayer: React.FC = () => {
  const { state, dispatch, audioRef } = usePlayer()
  const [progress, setProgress] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const onTime = () => {
      setProgress(audio.currentTime)
      dispatch({ type: 'SET_TIME', payload: audio.currentTime })
    }
    const onLoaded = () => setDuration(audio.duration || 0)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onLoaded)
    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onLoaded)
    }
  }, [audioRef, dispatch])

  // Enable keyboard spacebar to toggle play when focused inside player
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        dispatch({ type: state.isPlaying ? 'PAUSE' : 'PLAY' })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [dispatch, state.isPlaying])

  const seek = (ev: React.MouseEvent<HTMLDivElement>) => {
    const rect = (ev.target as HTMLElement).getBoundingClientRect()
    const x = ev.clientX - rect.left
    const pct = x / rect.width
    const t = pct * duration
    const audio = audioRef.current
    if (audio) audio.currentTime = t
    dispatch({ type: 'SET_TIME', payload: t })
  }

  const changeVolume = (v: number) => {
    dispatch({ type: 'SET_VOLUME', payload: v })
  }

  if (!state.current) {
    return <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t"> <div className="max-w-6xl mx-auto text-sm">No audio playing</div> <audio ref={audioRef}></audio></div>
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t" role="group" aria-label="Audio player">
      <div className="max-w-6xl mx-auto flex items-center gap-4">
        <img src={state.current.thumbnail} alt="episode" className="w-12 h-12 object-cover rounded-md" />
        <div className="flex-1">
          <div className="text-sm font-semibold">{state.current.title}</div>
          <div className="text-xs text-slate-600">{state.current.podcastId}</div>
          <div onClick={seek} className="mt-2 h-2 bg-slate-200 rounded overflow-hidden cursor-pointer" aria-label="Seek bar" role="slider">
            <div style={{ width: `${(progress / Math.max(duration, 1)) * 100}%` }} className="h-2 bg-accent" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label={state.isPlaying ? 'Pause' : 'Play'}
            onClick={() => dispatch({ type: state.isPlaying ? 'PAUSE' : 'PLAY' })}
            className="px-3 py-2 bg-accent text-white rounded-md"
          >
            {state.isPlaying ? 'Pause' : 'Play'}
          </button>
          <div className="text-xs text-slate-600">{formatDuration(progress)} / {formatDuration(duration)}</div>
          <div className="flex items-center gap-2 ml-2">
            <label className="text-xs text-slate-600">Vol</label>
            <input aria-label="Volume" type="range" min={0} max={1} step={0.01} value={state.volume} onChange={(e) => changeVolume(Number(e.target.value))} />
          </div>
        </div>
      </div>
      <audio ref={audioRef} className="hidden" controls={false} aria-hidden />
    </div>
  )
}

export default GlobalAudioPlayer
