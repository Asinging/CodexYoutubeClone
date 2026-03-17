interface ChannelTabsProps {
  activeTab: 'videos' | 'playlists' | 'about';
  onChange: (tab: 'videos' | 'playlists' | 'about') => void;
}

export const ChannelTabs = ({ activeTab, onChange }: ChannelTabsProps) => (
  <div className="flex gap-2 border-b pb-2 dark:border-zinc-800">
    {(['videos', 'playlists', 'about'] as const).map((tab) => (
      <button
        key={tab}
        className={`rounded-full px-4 py-2 text-sm ${activeTab === tab ? 'bg-zinc-200 dark:bg-zinc-800' : ''}`}
        onClick={() => onChange(tab)}
      >
        {tab[0].toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>
);
