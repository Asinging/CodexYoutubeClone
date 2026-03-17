import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { UploadModal } from '../upload/UploadModal';
import { useUIStore } from '../../store/useUIStore';

export const AppLayout = () => {
  const activeModal = useUIStore((state) => state.activeModal);
  const closeModal = useUIStore((state) => state.closeModal);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
      <UploadModal open={activeModal === 'upload'} onOpenChange={(open) => !open && closeModal()} />
    </div>
  );
};
