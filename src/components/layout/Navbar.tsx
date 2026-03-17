import { Menu, Search, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { Avatar } from '../ui/Avatar';
import { useUIStore } from '../../store/useUIStore';
import { useAuthStore } from '../../store/useAuthStore';

export const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const openModal = useUIStore((state) => state.openModal);
  const user = useAuthStore((state) => state.user);

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center gap-2">
        <Button variant="icon" onClick={toggleSidebar}>
          <Menu size={18} />
        </Button>
        <button onClick={() => navigate('/')} className="text-lg font-bold text-red-600">CodexTube</button>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate(`/search?q=${encodeURIComponent(query)}`);
        }}
        className="flex max-w-xl flex-1 items-center rounded-full border px-3"
      >
        <input value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent py-2 outline-none" placeholder="Search" />
        <Search size={16} />
      </form>
      <div className="flex items-center gap-2">
        <Button variant="ghost" onClick={() => openModal('upload')}>
          <Upload size={16} className="mr-1" /> Upload
        </Button>
        <Avatar name={user?.username ?? 'Guest'} src={user?.avatarUrl} className="h-9 w-9" />
      </div>
    </header>
  );
};
