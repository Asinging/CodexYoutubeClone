import cn from '../../utils/cn';

interface SpinnerProps {
  fullscreen?: boolean;
}

export const Spinner = ({ fullscreen = false }: SpinnerProps) => (
  <div className={cn('flex items-center justify-center', fullscreen && 'min-h-screen')}>
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-zinc-300 border-t-red-600" />
  </div>
);
