import React, { createContext, useContext, useReducer, useRef, useEffect } from 'react'
import type { Episode } from '../types'

type PlayerState = {
  current?: Episode
  isPlaying: boolean
  currentTime: number
  volume: number
  queue: Episode[]
}

type Action =
  | { type: 'SET_CURRENT'; payload?: Episode }
  | { type: 'PLAY' }
  | { type: 'PAUSE' }
  | { type: 'SET_TIME'; payload: number }
  | { type: 'SET_VOLUME'; payload: number }
  | { type: 'SET_QUEUE'; payload: Episode[] }

const PlayerContext = createContext<{
  state: PlayerState
  dispatch: React.Dispatch<Action>
  audioRef: React.RefObject<HTMLAudioElement>
}>({
  state: { isPlaying: false, currentTime: 0, volume: 1, queue: [] },
  dispatch: () => undefined,
  audioRef: { current: null }
})

function reducer(state: PlayerState, action: Action): PlayerState {
  switch (action.type) {
    case 'SET_CURRENT':
      return { ...state, current: action.payload, currentTime: 0 }
    case 'PLAY':
      return { ...state, isPlaying: true }
    case 'PAUSE':
      return { ...state, isPlaying: false }
    case 'SET_TIME':
      return { ...state, currentTime: action.payload }
    case 'SET_VOLUME':
      return { ...state, volume: action.payload }
    case 'SET_QUEUE':
      return { ...state, queue: action.payload }
    default:
      return state
  }
}

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    isPlaying: false,
    currentTime: 0,
    volume: 1,
    queue: []
  })

  const audioRef = useRef<HTMLAudioElement>(null)

  // Sync play/pause with audio element
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = state.volume
    if (state.isPlaying) {
      audio.play().catch(() => {})
    } else {
      audio.pause()
    }
  }, [state.isPlaying, state.volume])

  // Load current audio
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (state.current) {
      audio.src = state.current.audioUrl
      audio.load()
      if (state.isPlaying) audio.play().catch(() => {})
    } else {
      audio.pause()
      audio.removeAttribute('src')
      audio.load()
    }
  }, [state.current])

  return (
    <PlayerContext.Provider value={{ state, dispatch, audioRef }}>{children}</PlayerContext.Provider>
  )
}

export function usePlayer() {
  return useContext(PlayerContext)
}
