import { Suspense, lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { AppLayout } from '../components/layout/AppLayout';
import { Spinner } from '../components/ui/Spinner';
import { useAuthStore } from '../store/useAuthStore';

const HomePage = lazy(() => import('../pages/Home'));
const WatchPage = lazy(() => import('../pages/Watch'));
const SearchPage = lazy(() => import('../pages/Search'));
const ChannelPage = lazy(() => import('../pages/Channel'));
const StudioPage = lazy(() => import('../pages/Studio'));
const NotFoundPage = lazy(() => import('../pages/NotFound'));

const LazyWrap = ({ children }: { children: JSX.Element }) => <Suspense fallback={<Spinner fullscreen />}>{children}</Suspense>;

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const LoginPage = () => <div className="p-10">Please log in through your backend-integrated auth screen.</div>;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <LazyWrap><HomePage /></LazyWrap> },
      { path: 'watch/:videoId', element: <LazyWrap><WatchPage /></LazyWrap> },
      { path: 'search', element: <LazyWrap><SearchPage /></LazyWrap> },
      { path: 'channel/:channelId', element: <LazyWrap><ChannelPage /></LazyWrap> },
      { path: 'studio', element: <ProtectedRoute><LazyWrap><StudioPage /></LazyWrap></ProtectedRoute> },
      { path: 'upload', element: <ProtectedRoute><Navigate to="/" replace /></ProtectedRoute> },
      { path: 'login', element: <LoginPage /> },
      { path: '*', element: <LazyWrap><NotFoundPage /></LazyWrap> },
    ],
  },
]);
