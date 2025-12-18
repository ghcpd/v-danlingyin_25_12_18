import React from "react";

export default function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center gap-2">
      <input aria-label="Search" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search podcasts or episodes" className="flex-1 px-4 py-2 border rounded-md" />
      <button className="px-4 py-2 bg-primary text-white rounded-md">Search</button>
    </div>
  );
}
