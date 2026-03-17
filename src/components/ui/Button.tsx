import type { ButtonHTMLAttributes, ReactNode } from 'react';
import cn from '../../utils/cn';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger' | 'icon';
  children: ReactNode;
}

export const Button = ({ variant = 'primary', className, children, ...props }: ButtonProps) => (
  <button
    className={cn(
      'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50',
      variant === 'primary' && 'bg-red-600 text-white hover:bg-red-700',
      variant === 'ghost' && 'bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800',
      variant === 'danger' && 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950 dark:text-red-300',
      variant === 'icon' && 'h-9 w-9 rounded-full p-0 hover:bg-zinc-100 dark:hover:bg-zinc-800',
      className,
    )}
    {...props}
  >
    {children}
  </button>
);
