import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { channelApi, CHANNEL_QUERY_KEYS } from '../../api/channelApi';
import { ChannelHeader } from '../../components/channel/ChannelHeader';
import { ChannelTabs } from '../../components/channel/ChannelTabs';
import { SubscribeButton } from '../../components/channel/SubscribeButton';
import { VideoGrid } from '../../components/video/VideoGrid';

const ChannelPage = () => {
  const { channelId = '' } = useParams();
  const [tab, setTab] = useState<'videos' | 'playlists' | 'about'>('videos');
  const { data: channel } = useQuery({ queryKey: CHANNEL_QUERY_KEYS.detail(channelId), queryFn: () => channelApi.getById(channelId), enabled: Boolean(channelId) });

  if (!channel) return null;

  return (
    <div className="space-y-4">
      <ChannelHeader channel={channel} />
      <div className="flex justify-end"><SubscribeButton channel={channel} /></div>
      <ChannelTabs activeTab={tab} onChange={setTab} />
      {tab === 'videos' && <VideoGrid videos={channel.videos ?? []} />}
      {tab === 'about' && <p className="text-sm text-zinc-500">{channel.description ?? 'No channel description yet.'}</p>}
      {tab === 'playlists' && <p className="text-sm text-zinc-500">Playlists are coming soon.</p>}
    </div>
  );
};

export default ChannelPage;
