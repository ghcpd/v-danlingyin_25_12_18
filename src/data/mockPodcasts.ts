import { Category, Episode, Podcast } from '../types/index';

// Generate realistic podcast data with proper episodes
const generateEpisodes = (podcastId: string, count: number, baseTitle: string): Episode[] => {
  const episodes: Episode[] = [];
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const episodeNum = count - i;
    const daysAgo = i * 7;
    const releaseDate = new Date(now);
    releaseDate.setDate(releaseDate.getDate() - daysAgo);

    episodes.push({
      id: `ep-${podcastId}-${i + 1}`,
      podcastId,
      episodeNumber: episodeNum,
      title: `${baseTitle} - Episode ${episodeNum}`,
      description: `Dive deep into our latest episode where we explore fascinating aspects of ${baseTitle}. Our expert guests and hosts discuss industry trends, practical insights, and actionable strategies you can implement today.`,
      duration: 2400 + Math.random() * 3600, // 40-100 minutes
      releaseDate: releaseDate.toISOString().split('T')[0],
      audioUrl: `https://www.soundhelix.com/examples/mp3/SoundHelix-${episodeNum % 3}.mp3`,
      thumbnail: `https://picsum.photos/300/300?random=${podcastId}-${i}`,
    });
  }

  return episodes;
};

// Mock Podcast Data
export const mockPodcasts: Podcast[] = [
  {
    id: 'pod-1',
    title: 'The Tech Visionaries',
    author: 'Sarah Chen & Mike Rodriguez',
    description: 'Exploring cutting-edge technology innovations, AI, machine learning, and their impact on society. Join us weekly for interviews with industry leaders and deep dives into transformative tech.',
    coverImage: 'https://picsum.photos/400/400?random=1',
    category: [Category.Technology, Category.Business],
    episodeCount: 156,
    subscribers: 245000,
    rating: 4.8,
    releaseFrequency: 'Weekly',
  },
  {
    id: 'pod-2',
    title: 'Business Bytes',
    author: 'Jessica Wang',
    description: 'The ultimate podcast for entrepreneurs and business leaders. We discuss startup strategies, market trends, and invite successful founders to share their stories and lessons learned.',
    coverImage: 'https://picsum.photos/400/400?random=2',
    category: [Category.Business, Category.Education],
    episodeCount: 203,
    subscribers: 189000,
    rating: 4.7,
    releaseFrequency: 'Bi-weekly',
  },
  {
    id: 'pod-3',
    title: 'Crime Uncovered',
    author: 'Detective Marcus Moore',
    description: 'True crime investigative reporting bringing you the most intriguing cases from around the world. Real investigations, real stories, real justice.',
    coverImage: 'https://picsum.photos/400/400?random=3',
    category: [Category.TrueCrime],
    episodeCount: 89,
    subscribers: 512000,
    rating: 4.9,
    releaseFrequency: 'Bi-weekly',
  },
  {
    id: 'pod-4',
    title: 'Laugh Out Loud',
    author: 'Alex Murphy & Jordan Lee',
    description: 'A comedy podcast featuring hilarious interviews with comedians, funny stories, and laugh-out-loud moments. Your daily dose of humor and entertainment.',
    coverImage: 'https://picsum.photos/400/400?random=4',
    category: [Category.Comedy],
    episodeCount: 267,
    subscribers: 156000,
    rating: 4.6,
    releaseFrequency: 'Weekly',
  },
  {
    id: 'pod-5',
    title: 'Learning Unlimited',
    author: 'Prof. David Miller',
    description: 'Educational podcast covering history, science, philosophy, and more. Perfect for lifelong learners who want to expand their knowledge in a fun, engaging way.',
    coverImage: 'https://picsum.photos/400/400?random=5',
    category: [Category.Education, Category.History],
    episodeCount: 178,
    subscribers: 234000,
    rating: 4.7,
    releaseFrequency: 'Twice a week',
  },
  {
    id: 'pod-6',
    title: 'Wellness Warriors',
    author: 'Dr. Emily Chen',
    description: 'Your guide to physical and mental health. Expert interviews with fitness trainers, nutritionists, and wellness coaches to help you live your healthiest life.',
    coverImage: 'https://picsum.photos/400/400?random=6',
    category: [Category.Health, Category.Education],
    episodeCount: 134,
    subscribers: 198000,
    rating: 4.8,
    releaseFrequency: 'Weekly',
  },
  {
    id: 'pod-7',
    title: 'Global News Daily',
    author: 'News Team International',
    description: 'Stay informed with our daily news briefings. Covering world events, politics, economics, and breaking news with expert analysis and diverse perspectives.',
    coverImage: 'https://picsum.photos/400/400?random=7',
    category: [Category.News],
    episodeCount: 445,
    subscribers: 367000,
    rating: 4.5,
    releaseFrequency: 'Daily',
  },
  {
    id: 'pod-8',
    title: 'The Sports Talk Show',
    author: 'Coach Brandon Hill',
    description: 'All things sports! From game analysis to athlete interviews, we cover football, basketball, baseball, and more. Your source for sports news and entertainment.',
    coverImage: 'https://picsum.photos/400/400?random=8',
    category: [Category.Sports],
    episodeCount: 289,
    subscribers: 221000,
    rating: 4.6,
    releaseFrequency: 'Weekly',
  },
  {
    id: 'pod-9',
    title: 'Scientific Breakthroughs',
    author: 'Dr. Rachel Foster',
    description: 'Explore the latest discoveries in science and research. From space exploration to biology, we break down complex scientific concepts into fascinating stories.',
    coverImage: 'https://picsum.photos/400/400?random=9',
    category: [Category.Science, Category.Education],
    episodeCount: 112,
    subscribers: 156000,
    rating: 4.8,
    releaseFrequency: 'Bi-weekly',
  },
  {
    id: 'pod-10',
    title: 'History Through Time',
    author: 'Prof. James Richardson',
    description: 'Journey through history with stories of pivotal moments, legendary figures, and civilizations. Every episode brings history to life with engaging narration.',
    coverImage: 'https://picsum.photos/400/400?random=10',
    category: [Category.History, Category.Education],
    episodeCount: 156,
    subscribers: 189000,
    rating: 4.7,
    releaseFrequency: 'Weekly',
  },
  {
    id: 'pod-11',
    title: 'Fiction & Fantasy',
    author: 'Storyteller Alex Nova',
    description: 'Original serialized fiction, fantasy adventures, and literary discussions. A podcast for lovers of stories, imagination, and creative worlds.',
    coverImage: 'https://picsum.photos/400/400?random=11',
    category: [Category.Fiction],
    episodeCount: 98,
    subscribers: 123000,
    rating: 4.6,
    releaseFrequency: 'Weekly',
  },
  {
    id: 'pod-12',
    title: 'Self-Made Success',
    author: 'Life Coach Thomas Adams',
    description: 'Transform your life with self-improvement strategies, personal development tips, and motivational interviews. Build the best version of yourself.',
    coverImage: 'https://picsum.photos/400/400?random=12',
    category: [Category.SelfHelp, Category.Business],
    episodeCount: 201,
    subscribers: 267000,
    rating: 4.8,
    releaseFrequency: 'Twice a week',
  },
];

// Create episodes for each podcast
export const mockEpisodes: Episode[] = mockPodcasts.flatMap((podcast) =>
  generateEpisodes(podcast.id, 8, podcast.title)
);

// Helper function to get episodes for a specific podcast
export const getEpisodesByPodcastId = (podcastId: string): Episode[] => {
  return mockEpisodes.filter((episode) => episode.podcastId === podcastId);
};

// Helper function to search podcasts
export const searchPodcasts = (
  query: string,
  categories?: Category[],
  minRating?: number
): Podcast[] => {
  return mockPodcasts.filter((podcast) => {
    const matchesQuery =
      query === '' ||
      podcast.title.toLowerCase().includes(query.toLowerCase()) ||
      podcast.author.toLowerCase().includes(query.toLowerCase()) ||
      podcast.description.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      !categories || categories.length === 0 || categories.some((cat) => podcast.category.includes(cat));

    const matchesRating = !minRating || podcast.rating >= minRating;

    return matchesQuery && matchesCategory && matchesRating;
  });
};

// Helper function to get podcasts by category
export const getPodcastsByCategory = (category: Category): Podcast[] => {
  return mockPodcasts.filter((podcast) => podcast.category.includes(category));
};

// Helper function to get trending podcasts (sorted by subscribers)
export const getTrendingPodcasts = (limit: number = 8): Podcast[] => {
  return [...mockPodcasts].sort((a, b) => b.subscribers - a.subscribers).slice(0, limit);
};

// Helper function to get recently added podcasts
export const getRecentlyAddedPodcasts = (limit: number = 6): Podcast[] => {
  return [...mockPodcasts].slice(-limit).reverse();
};
