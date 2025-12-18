import type { Podcast, Episode } from '../types'

const podcasts: Podcast[] = [
  {
    id: 'tech-talks',
    title: 'Tech Talks Daily',
    author: 'Jane Doe',
    description: 'Daily conversations about software, AI, and the web.',
    coverImage: 'https://picsum.photos/seed/tech/400/400',
    category: ['Technology', 'Education'],
    episodeCount: 6,
    subscribers: 12000,
    rating: 4.6
  },
  {
    id: 'biz-breakdown',
    title: 'Business Breakdown',
    author: 'ABC Media',
    description: 'Deep dives into startups and entrepreneurship.',
    coverImage: 'https://picsum.photos/seed/business/400/400',
    category: ['Business'],
    episodeCount: 8,
    subscribers: 8500,
    rating: 4.4
  },
  {
    id: 'true-crimes',
    title: 'True Crime Files',
    author: 'Mystery Network',
    description: 'Investigative reporting on true crime cases.',
    coverImage: 'https://picsum.photos/seed/crime/400/400',
    category: ['True Crime'],
    episodeCount: 10,
    subscribers: 20000,
    rating: 4.8
  },
  {
    id: 'daily-news',
    title: 'Daily News Byte',
    author: 'Newsroom',
    description: 'Top headlines and analysis in 20 minutes.',
    coverImage: 'https://picsum.photos/seed/news/400/400',
    category: ['News'],
    episodeCount: 12,
    subscribers: 5000,
    rating: 4.1
  },
  {
    id: 'fit-and-fun',
    title: 'Fit & Fun',
    author: 'Health Hub',
    description: 'Fitness tips and health interviews.',
    coverImage: 'https://picsum.photos/seed/fitness/400/400',
    category: ['Health'],
    episodeCount: 7,
    subscribers: 3000,
    rating: 4.2
  },
  {
    id: 'science-lab',
    title: 'Science Lab',
    author: 'Dr. Smith',
    description: 'Exploring discoveries in science and tech.',
    coverImage: 'https://picsum.photos/seed/science/400/400',
    category: ['Science', 'Education'],
    episodeCount: 9,
    subscribers: 6200,
    rating: 4.5
  },
  {
    id: 'history-hour',
    title: 'History Hour',
    author: 'Archive',
    description: 'Stories from the past that shaped today.',
    coverImage: 'https://picsum.photos/seed/history/400/400',
    category: ['History'],
    episodeCount: 5,
    subscribers: 4200,
    rating: 4.3
  },
  {
    id: 'sports-talk',
    title: 'Sports Talk Live',
    author: 'Play by Play',
    description: 'Weekly sports commentary and interviews.',
    coverImage: 'https://picsum.photos/seed/sports/400/400',
    category: ['Sports'],
    episodeCount: 6,
    subscribers: 3800,
    rating: 4.0
  },
  {
    id: 'comedy-club',
    title: 'Comedy Club',
    author: 'Laugh Labs',
    description: 'Standups and funny interviews.',
    coverImage: 'https://picsum.photos/seed/comedy/400/400',
    category: ['Comedy'],
    episodeCount: 8,
    subscribers: 9100,
    rating: 4.7
  },
  {
    id: 'edu-now',
    title: 'Edu Now',
    author: 'LearnWell',
    description: 'Short lessons on a variety of academic topics.',
    coverImage: 'https://picsum.photos/seed/edu/400/400',
    category: ['Education'],
    episodeCount: 15,
    subscribers: 7700,
    rating: 4.6
  },
  {
    id: 'startup-stories',
    title: 'Startup Stories',
    author: 'Founders Club',
    description: 'Interviews with founders and investors.',
    coverImage: 'https://picsum.photos/seed/startup/400/400',
    category: ['Business', 'Technology'],
    episodeCount: 11,
    subscribers: 15000,
    rating: 4.7
  },
  {
    id: 'science-snap',
    title: 'Science Snap',
    author: 'Quick Labs',
    description: 'Bite-sized science episodes.',
    coverImage: 'https://picsum.photos/seed/sciencesnap/400/400',
    category: ['Science'],
    episodeCount: 4,
    subscribers: 2700,
    rating: 4.0
  }
]

function makeEpisodes(podcastId: string, count: number): Episode[] {
  const ep: Episode[] = []
  for (let i = 1; i <= count; i++) {
    ep.push({
      id: `${podcastId}-ep-${i}`,
      podcastId,
      title: `Episode ${i} - ${podcastId.replace('-', ' ')}`,
      description: `This is episode ${i} of ${podcastId}. Discusses topics and interviews.`,
      duration: 600 + i * 30,
      releaseDate: new Date(Date.now() - i * 86400000).toISOString(),
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      episodeNumber: i,
      thumbnail: `https://picsum.photos/seed/${podcastId}${i}/200/200`
    })
  }
  return ep
}

const episodes = podcasts.flatMap((p) => makeEpisodes(p.id, Math.min(10, p.episodeCount)))

export { podcasts, episodes }
