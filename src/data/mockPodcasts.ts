import { Podcast, Episode } from '../types'
import { Category } from '../types'

// Small helper to make IDs
const id = (prefix: string, i: number) => `${prefix}-${i}`

export const podcasts: Podcast[] = [
  {
    id: id('pod', 1),
    title: 'Tech Talks Daily',
    author: 'Alex Rivera',
    description: 'Daily deep dives into tech, startups, and developer stories.',
    coverImage: 'https://picsum.photos/seed/tech1/400/400',
    category: [Category.Technology, Category.Business],
    episodeCount: 8,
    subscribers: 12000,
    rating: 4.7
  },
  {
    id: id('pod', 2),
    title: 'Business Brief',
    author: 'Morgan Lee',
    description: 'Short episodes on business trends and market insights.',
    coverImage: 'https://picsum.photos/seed/business1/400/400',
    category: [Category.Business],
    episodeCount: 6,
    subscribers: 8500,
    rating: 4.4
  },
  {
    id: id('pod', 3),
    title: 'History Uncovered',
    author: 'Dr. Stevens',
    description: 'Exploring hidden stories from the past.',
    coverImage: 'https://picsum.photos/seed/history1/400/400',
    category: [Category.History, Category.Education],
    episodeCount: 7,
    subscribers: 5400,
    rating: 4.6
  },
  {
    id: id('pod', 4),
    title: 'Science For Everyone',
    author: 'J. Kim',
    description: 'Science topics explained in simple terms.',
    coverImage: 'https://picsum.photos/seed/science1/400/400',
    category: [Category.Science, Category.Education],
    episodeCount: 5,
    subscribers: 4000,
    rating: 4.5
  },
  {
    id: id('pod', 5),
    title: 'Laugh Out Loud',
    author: 'Comedy Co',
    description: 'Stand-up highlights and short comedic sketches.',
    coverImage: 'https://picsum.photos/seed/comedy1/400/400',
    category: [Category.Comedy],
    episodeCount: 9,
    subscribers: 15000,
    rating: 4.8
  },
  {
    id: id('pod', 6),
    title: 'Health & You',
    author: 'Dr. Patel',
    description: 'Modern health tips and interviews with experts.',
    coverImage: 'https://picsum.photos/seed/health1/400/400',
    category: [Category.Health],
    episodeCount: 5,
    subscribers: 6400,
    rating: 4.3
  },
  {
    id: id('pod', 7),
    title: 'True Crime Files',
    author: 'Investigative Team',
    description: 'In-depth true crime investigations and interviews.',
    coverImage: 'https://picsum.photos/seed/crime1/400/400',
    category: [Category.TrueCrime],
    episodeCount: 10,
    subscribers: 22000,
    rating: 4.9
  },
  {
    id: id('pod', 8),
    title: 'Sports Center',
    author: 'Sam Ortega',
    description: 'Weekly sports news and analysis.',
    coverImage: 'https://picsum.photos/seed/sports1/400/400',
    category: [Category.Sports],
    episodeCount: 6,
    subscribers: 3000,
    rating: 4.0
  },
  {
    id: id('pod', 9),
    title: 'News Now',
    author: 'Anchor Weekly',
    description: 'Short news summaries for busy people.',
    coverImage: 'https://picsum.photos/seed/news1/400/400',
    category: [Category.News],
    episodeCount: 12,
    subscribers: 19000,
    rating: 4.2
  },
  {
    id: id('pod', 10),
    title: 'Startup Stories',
    author: 'Founders Network',
    description: 'Interviews with founders about building startups.',
    coverImage: 'https://picsum.photos/seed/startup1/400/400',
    category: [Category.Business, Category.Technology],
    episodeCount: 8,
    subscribers: 7200,
    rating: 4.6
  },
  {
    id: id('pod', 11),
    title: 'Learn Spanish',
    author: 'Language Lab',
    description: 'Bite-sized Spanish lessons for beginners.',
    coverImage: 'https://picsum.photos/seed/lang1/400/400',
    category: [Category.Education],
    episodeCount: 7,
    subscribers: 2100,
    rating: 4.1
  },
  {
    id: id('pod', 12),
    title: 'Mindful Minutes',
    author: 'Calm Studio',
    description: 'Short mindfulness exercises and meditations.',
    coverImage: 'https://picsum.photos/seed/mind1/400/400',
    category: [Category.Health, Category.Education],
    episodeCount: 5,
    subscribers: 8200,
    rating: 4.6
  }
]

// Create sample episodes for each podcast
export const episodes: Episode[] = []

const sampleAudio = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

podcasts.forEach((p, pi) => {
  for (let i = 1; i <= Math.max(5, Math.min(10, p.episodeCount)); i++) {
    episodes.push({
      id: `ep-${pi + 1}-${i}`,
      podcastId: p.id,
      title: `${p.title} - Episode ${i}`,
      description: `Episode ${i} of ${p.title}: Short summary goes here.`,
      duration: 60 * (10 + i * 5),
      releaseDate: new Date(Date.now() - i * 86400000).toISOString(),
      audioUrl: sampleAudio,
      episodeNumber: i,
      thumbnail: `https://picsum.photos/seed/${p.id}-${i}/200/200`
    })
  }
})
