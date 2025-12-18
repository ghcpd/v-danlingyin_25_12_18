export interface Podcast {
  id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  category: string[];
  episodeCount: number;
  subscribers: number;
  rating: number; // 0-5 scale
}

export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  duration: number; // seconds
  releaseDate: string; // ISO string
  audioUrl: string;
  episodeNumber: number;
  thumbnail?: string;
}

export enum Category {
  Technology = 'Technology',
  Business = 'Business',
  Comedy = 'Comedy',
  Education = 'Education',
  Health = 'Health',
  TrueCrime = 'True Crime',
  News = 'News',
  Sports = 'Sports',
  Science = 'Science',
  History = 'History',
}
