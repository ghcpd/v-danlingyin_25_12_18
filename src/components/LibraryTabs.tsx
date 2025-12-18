import React from 'react';

interface LibraryTabsProps {
  active: 'subscriptions' | 'favorites' | 'history';
  onChange: (tab: LibraryTabsProps['active']) => void;
}

export const LibraryTabs: React.FC<LibraryTabsProps> = ({ active, onChange }) => {
  const tabs: LibraryTabsProps['active'][] = ['subscriptions', 'favorites', 'history'];
  return (
    <div role="tablist" className="flex space-x-4 border-b mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          role="tab"
          aria-selected={active === tab}
          onClick={() => onChange(tab)}
          className={`px-4 py-2 font-medium focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
            active === tab ? 'border-b-2 border-primary text-primary' : 'text-gray-600'
          }`}
        >
          {tab.charAt(0).toUpperCase() + tab.slice(1)}
        </button>
      ))}
    </div>
  );
};
