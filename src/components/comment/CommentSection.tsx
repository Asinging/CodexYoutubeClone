import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { commentApi, COMMENT_QUERY_KEYS } from '../../api/commentApi';
import type { Comment } from '../../types/comment.types';
import { CommentInput } from './CommentInput';
import { CommentItem } from './CommentItem';
import { useAuthStore } from '../../store/useAuthStore';

interface CommentSectionProps {
  videoId: string;
}

export const CommentSection = ({ videoId }: CommentSectionProps) => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const { data } = useQuery({ queryKey: COMMENT_QUERY_KEYS.list(videoId), queryFn: () => commentApi.getComments(videoId) });

  const mutation = useMutation({
    mutationFn: (text: string) => commentApi.postComment({ videoId, text }),
    onMutate: async (text) => {
      await queryClient.cancelQueries({ queryKey: COMMENT_QUERY_KEYS.list(videoId) });
      const previous = queryClient.getQueryData<{ items: Comment[]; nextCursor: string | null }>(COMMENT_QUERY_KEYS.list(videoId));
      const optimistic: Comment = {
        id: crypto.randomUUID(),
        videoId,
        text,
        createdAt: new Date().toISOString(),
        user: {
          id: user?.id ?? 'me',
          username: user?.username ?? 'You',
          avatarUrl: user?.avatarUrl,
        },
      };
      queryClient.setQueryData(COMMENT_QUERY_KEYS.list(videoId), {
        items: [optimistic, ...(previous?.items ?? [])],
        nextCursor: previous?.nextCursor ?? null,
      });
      return { previous };
    },
    onError: (_error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(COMMENT_QUERY_KEYS.list(videoId), context.previous);
      }
    },
  });

  return (
    <section className="space-y-4">
      <h2 className="font-semibold">Comments</h2>
      <CommentInput onSubmit={(text) => mutation.mutate(text)} />
      <div className="space-y-4">{data?.items.map((comment) => <CommentItem key={comment.id} comment={comment} />)}</div>
    </section>
  );
};
