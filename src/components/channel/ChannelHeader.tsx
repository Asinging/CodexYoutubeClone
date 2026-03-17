import type { Channel } from '../../types/channel.types';
import { Avatar } from '../ui/Avatar';
import { formatViews } from '../../utils/formatViews';

interface ChannelHeaderProps {
  channel: Channel;
}

export const ChannelHeader = ({ channel }: ChannelHeaderProps) => (
  <section className="space-y-4">
    {channel.bannerUrl && <img src={channel.bannerUrl} alt={channel.name} className="h-40 w-full rounded-xl object-cover" />}
    <div className="flex items-center gap-4">
      <Avatar src={channel.avatarUrl} name={channel.name} className="h-16 w-16" />
      <div>
        <h1 className="text-2xl font-bold">{channel.name}</h1>
        <p className="text-sm text-zinc-500">{channel.stats.subscribers.toLocaleString()} subscribers • {formatViews(channel.stats.totalViews)}</p>
      </div>
    </div>
  </section>
);
