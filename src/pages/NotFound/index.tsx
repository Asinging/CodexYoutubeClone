import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
    <h1 className="text-3xl font-bold">404</h1>
    <p className="text-zinc-500">Page not found</p>
    <Link to="/" className="text-red-600">Go back home</Link>
  </div>
);

export default NotFoundPage;
