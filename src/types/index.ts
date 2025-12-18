export type Category = 'Technology' | 'Business' | 'Comedy' | 'Education' | 'Health' | 'True Crime' | 'News' | 'Sports' | 'Science' | 'History'

export interface Podcast {
  id: string
  title: string
  author: string
  description: string
  coverImage: string
  category: Category[]
  episodeCount: number
  subscribers: number
  rating: number
}

export interface Episode {
  id: string
  podcastId: string
  title: string
  description: string
  duration: number
  releaseDate: string
  audioUrl: string
  episodeNumber: number
  thumbnail?: string
}
