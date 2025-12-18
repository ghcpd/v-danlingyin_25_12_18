import React from "react";
import { useParams } from "react-router-dom";
import { podcasts } from "../data/mockPodcasts";
import PodcastCard from "../components/PodcastCard";

export default function CategoryPage(): JSX.Element {
  const { name } = useParams();
  const list = podcasts.filter((p) => p.category.map((c) => c.toLowerCase()).includes((name || "").toLowerCase()));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Category: {name}</h2>
      {list.length === 0 ? <div className="py-8 text-gray-500">No podcasts found for this category.</div> : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((p) => <PodcastCard key={p.id} podcast={p} />)}
        </div>
      )}
    </div>
  );
}
