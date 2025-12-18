import React from "react";

export default function CategoryPill({ children, active = false, onClick }: { children: React.ReactNode; active?: boolean; onClick?: () => void; }) {
  return (
    <button onClick={onClick} className={`px-3 py-1 rounded-full text-sm ${active ? "bg-primary text-white" : "bg-gray-100 text-gray-700"}`} aria-pressed={active}>
      {children}
    </button>
  );
}
