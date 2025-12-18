import { Podcast, Episode, Category } from "../types";

const categories = [
  Category.Technology,
  Category.Business,
  Category.Comedy,
  Category.Education,
  Category.Health,
  Category.News,
  Category.Sports,
  Category.Science,
  Category.History,
  Category.TrueCrime
];

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const podcasts: Podcast[] = Array.from({ length: 12 }).map((_, i) => {
  const id = `pod-${i + 1}`;
  const cat = [categories[i % categories.length]];
  const title = `${cat[0]} Spotlight ${i + 1}`;
  return {
    id,
    title,
    author: `${cat[0]} Media`,
    description: `A deep dive into ${cat[0]} topics — episode series ${i + 1}.`,
    coverImage: `https://picsum.photos/seed/${id}/400/400`,
    category: cat,
    episodeCount: 5,
    subscribers: rand(500, 50000),
    rating: parseFloat((Math.random() * 2 + 3).toFixed(1))
  } as Podcast;
});

export const episodes: Episode[] = podcasts.flatMap((p) => {
  return Array.from({ length: 5 }).map((_, j) => {
    const id = `${p.id}-e${j + 1}`;
    const duration = rand(5 * 60, 90 * 60); // 5min - 90min
    const release = new Date(Date.now() - (j + 1) * 86400000 * (j + 1)).toISOString();
    return {
      id,
      podcastId: p.id,
      title: `${p.title} — Episode ${j + 1}`,
      description: `In this episode we discuss ${p.category.join(", ")}.`,
      duration,
      releaseDate: release,
      audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      episodeNumber: j + 1,
      thumbnail: p.coverImage
    } as Episode;
  });
});

export default { podcasts, episodes };
