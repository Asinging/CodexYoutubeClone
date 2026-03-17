import { Home, Library, UserCircle, Video } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import cn from '../../utils/cn';
import { useUIStore } from '../../store/useUIStore';

const links = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/studio', icon: Video, label: 'Studio' },
  { to: '/search', icon: Library, label: 'Explore' },
  { to: '/channel/me', icon: UserCircle, label: 'Channel' },
];

export const Sidebar = () => {
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);

  return (
    <aside className={cn('border-r p-2 transition-all dark:border-zinc-800', isSidebarOpen ? 'w-56' : 'w-16')}>
      <nav className="space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn('flex items-center gap-3 rounded-xl p-3 text-sm', isActive && 'bg-zinc-100 dark:bg-zinc-800')
            }
          >
            <Icon size={18} />
            {isSidebarOpen && label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
