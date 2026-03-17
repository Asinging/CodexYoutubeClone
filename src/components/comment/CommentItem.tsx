import type { Comment } from '../../types/comment.types';
import { Avatar } from '../ui/Avatar';
import { formatDate } from '../../utils/formatDate';

interface CommentItemProps {
  comment: Comment;
}

export const CommentItem = ({ comment }: CommentItemProps) => (
  <article className="flex gap-3">
    <Avatar name={comment.user.username} src={comment.user.avatarUrl} />
    <div>
      <p className="text-sm font-medium">{comment.user.username} <span className="text-xs text-zinc-500">{formatDate(comment.createdAt)}</span></p>
      <p className="text-sm">{comment.text}</p>
    </div>
  </article>
);
