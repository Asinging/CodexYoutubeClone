import { formatDistanceToNowStrict } from 'date-fns';

export const formatDate = (isoDate: string): string => `${formatDistanceToNowStrict(new Date(isoDate))} ago`;
