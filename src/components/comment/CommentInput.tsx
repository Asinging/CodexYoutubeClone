import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/useAuthStore';

const commentSchema = z.object({ text: z.string().min(1).max(500) });

type CommentForm = z.infer<typeof commentSchema>;

interface CommentInputProps {
  onSubmit: (text: string) => void;
}

export const CommentInput = ({ onSubmit }: CommentInputProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentForm>({ resolver: zodResolver(commentSchema) });

  if (!isAuthenticated) {
    return <p className="text-sm text-zinc-500">Sign in to comment.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit((values) => {
        onSubmit(values.text);
        reset();
      })}
      className="space-y-2"
    >
      <textarea {...register('text')} className="w-full rounded-xl border p-3 dark:border-zinc-800 dark:bg-zinc-900" rows={3} />
      {errors.text && <p className="text-xs text-red-600">{errors.text.message}</p>}
      <Button type="submit">Comment</Button>
    </form>
  );
};
