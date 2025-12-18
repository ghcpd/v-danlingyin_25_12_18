// Podcast and Episode Types
export interface Podcast {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  category: Category[];
  episodeCount: number;
  subscribers: number;
  rating: number;
  releaseFrequency: string;
}

export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  duration: number; // in seconds
  releaseDate: string;
  audioUrl: string;
  episodeNumber: number;
  thumbnail?: string;
}

// Player State Types
export interface PlayerState {
  currentEpisode: Episode | null;
  isPlaying: boolean;
  currentTime: number;
  volume: number;
  queue: Episode[];
  queueIndex: number;
}

// Library Types
export interface LibraryState {
  subscribed: string[]; // podcast IDs
  favorites: string[]; // episode IDs
  history: HistoryItem[];
}

export interface HistoryItem {
  episodeId: string;
  podcastId: string;
  listenedAt: string;
  currentTime: number;
}

// Category Types
export enum Category {
  Technology = 'Technology',
  Business = 'Business',
  TrueCrime = 'True Crime',
  Comedy = 'Comedy',
  Education = 'Education',
  Health = 'Health & Fitness',
  News = 'News',
  Sports = 'Sports',
  Science = 'Science',
  History = 'History',
  Fiction = 'Fiction',
  SelfHelp = 'Self-Help',
}

// UI Component Props Types
export interface PodcastCardProps {
  podcast: Podcast;
  onPlay?: (podcastId: string) => void;
  onSubscribe?: (podcastId: string) => void;
}

export interface EpisodeItemProps {
  episode: Episode;
  podcast: Podcast;
  onPlay?: (episode: Episode) => void;
  isFavorite?: boolean;
  onToggleFavorite?: (episodeId: string) => void;
}

export interface CategoryPillProps {
  category: Category;
  isActive?: boolean;
  onClick?: (category: Category) => void;
}

export interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek?: (time: number) => void;
}

export interface VolumeControlProps {
  volume: number;
  onVolumeChange?: (volume: number) => void;
}

export interface SearchFilters {
  query: string;
  categories: Category[];
  minDuration?: number;
  maxDuration?: number;
  minRating?: number;
  sortBy: 'relevance' | 'rating' | 'recent';
}

export interface FilterPanelProps {
  onFilterChange?: (filters: Partial<SearchFilters>) => void;
  currentFilters: SearchFilters;
}

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface HeaderProps {
  onSearch?: (query: string) => void;
}

export interface HeroProps {
  featuredPodcast: Podcast;
  onPlay?: (podcastId: string) => void;
}
