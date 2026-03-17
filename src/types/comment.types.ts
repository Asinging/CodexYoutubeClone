import type { User } from './user.types';

export interface Comment {
  id: string;
  videoId: string;
  text: string;
  createdAt: string;
  user: Pick<User, 'id' | 'username' | 'avatarUrl'>;
}

export interface CreateCommentDto {
  videoId: string;
  text: string;
}

export interface PaginatedComments {
  items: Comment[];
  nextCursor: string | null;
}
