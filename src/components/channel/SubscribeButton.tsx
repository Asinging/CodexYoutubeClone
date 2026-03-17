import { useMutation, useQueryClient } from '@tanstack/react-query';
import { channelApi, CHANNEL_QUERY_KEYS } from '../../api/channelApi';
import type { Channel } from '../../types/channel.types';
import { Button } from '../ui/Button';

interface SubscribeButtonProps {
  channel: Channel;
}

export const SubscribeButton = ({ channel }: SubscribeButtonProps) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => (channel.isSubscribed ? channelApi.unsubscribe({ channelId: channel.id }) : channelApi.subscribe({ channelId: channel.id })),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: CHANNEL_QUERY_KEYS.detail(channel.id) });
      const previous = queryClient.getQueryData<Channel>(CHANNEL_QUERY_KEYS.detail(channel.id));
      queryClient.setQueryData<Channel>(CHANNEL_QUERY_KEYS.detail(channel.id), (old) =>
        old
          ? {
              ...old,
              isSubscribed: !old.isSubscribed,
              stats: { ...old.stats, subscribers: old.stats.subscribers + (old.isSubscribed ? -1 : 1) },
            }
          : old,
      );
      return { previous };
    },
    onError: (_error, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(CHANNEL_QUERY_KEYS.detail(channel.id), context.previous);
      }
    },
  });

  return <Button onClick={() => mutation.mutate()}>{channel.isSubscribed ? 'Subscribed' : 'Subscribe'}</Button>;
};
