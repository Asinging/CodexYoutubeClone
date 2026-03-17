import cn from '../../utils/cn';

interface AvatarProps {
  src?: string;
  name: string;
  className?: string;
}

export const Avatar = ({ src, name, className }: AvatarProps) => {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return src ? (
    <img src={src} alt={name} className={cn('h-10 w-10 rounded-full object-cover', className)} />
  ) : (
    <div className={cn('flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-sm font-semibold dark:bg-zinc-700', className)}>
      {initials}
    </div>
  );
};
