import React from "react";
import { useLibrary } from "../context/LibraryContext";
import { podcasts, episodes } from "../data/mockPodcasts";
import PodcastCard from "../components/PodcastCard";
import EmptyState from "../components/EmptyState";

export default function LibraryPage(): JSX.Element {
  const lib = useLibrary();
  const subs = podcasts.filter((p) => lib.subscriptions.includes(p.id));
  const favs = episodes.filter((e) => lib.favorites.includes(e.id));
  const hist = episodes.filter((e) => lib.history.includes(e.id));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">My Library</h2>

      <section className="mb-6">
        <h3 className="font-medium mb-2">Subscribed Podcasts</h3>
        {subs.length === 0 ? <EmptyState title="No subscriptions" description="Subscribe to podcasts to see them here." /> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {subs.map((p) => <PodcastCard key={p.id} podcast={p} />)}
          </div>
        )}
      </section>

      <section className="mb-6">
        <h3 className="font-medium mb-2">Favorites</h3>
        {favs.length === 0 ? <EmptyState title="No favorites" description="Mark episodes as favorite to save them here." /> : (
          <div className="space-y-2">
            {favs.map((e) => <div key={e.id} className="p-3 bg-white rounded-md shadow-sm">{e.title}</div>)}
          </div>
        )}
      </section>

      <section>
        <h3 className="font-medium mb-2">Listening history</h3>
        {hist.length === 0 ? <EmptyState title="No history" description="Play episodes to populate history." /> : (
          <div className="space-y-2">
            {hist.map((e) => <div key={e.id} className="p-3 bg-white rounded-md shadow-sm">{e.title}</div>)}
          </div>
        )}
      </section>
    </div>
  );
}
