import React from "react";

export default function EmptyState({ title = "Nothing here", description = "Try subscribing or searching for content." }: { title?: string; description?: string }) {
  return (
    <div className="text-center py-12">
      <div className="text-2xl font-semibold">{title}</div>
      <div className="text-gray-500 mt-2">{description}</div>
    </div>
  );
}
