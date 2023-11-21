'use client';
import React, { useEffect, useState } from 'react';
import DashNav from '../components/dashnav';
import { useSession } from 'next-auth/react';
import { grabUserListenNow } from '@/lib/utils/index';
import Image from 'next/image';
import PlayButton from '../components/play';
import Player from '../components/player';
import { usePlayerStore } from '../states';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import PageSection from '../components/pagesections/pagesection';
import { Separator } from '@/components/ui/separator';
import PageTitle from '../components/pagesections/pagetitle';
import SubSection from '../components/pagesections/subtitle';
import ListenNow from '../components/pagesections/songoverflow';
import SongOverflow from '../components/pagesections/songoverflow';
import PlaylistOverflow from '../components/pagesections/playlistoverflow';

const loaderProp = (src: string) => {
  return src;
};

interface ListenNowState {
  songs: SpotifyApi.TrackSearchResponse[];
  playlists: {
    tracks: SpotifyApi.TrackSearchResponse[];
    playlistName: string;
    playlistCover: string;
  }[];
}

const Content = () => {
  const { data: session } = useSession();
  const { uris } = usePlayerStore();

  const [listenNow, setListenNow] = useState<ListenNowState | null>(null);
  useEffect(() => {
    async function handleGrabUaserListenNow() {
      const data = await grabUserListenNow(session!.user.uid);
      if (!data) {
        return;
      }
      setListenNow(data);
    }
    if (session) {
      handleGrabUaserListenNow();
    }
  }, [session]);
  console.log(listenNow);
  return (
    <div className='page-container overflow-x-hidden'>
      <DashNav />
      <section className='w-full overflow-x-hidden'>
        <div className='page-section'>
          <PageTitle title='Listen Now' />
          <SubSection
            redirect='/dashboard/songs'
            sub_title='Your Generated Tracks'
          >
            {listenNow ? (
              <SongOverflow songs={listenNow.songs} />
            ) : (
              <div className='h-[333px]'></div>
            )}
          </SubSection>
          <SubSection
            redirect='/dashboard/playlists'
            sub_title='Your Generated Playlists'
          >
            {listenNow ? (
              <PlaylistOverflow playlists={listenNow.playlists} />
            ) : (
              <div className='h-[333px]'></div>
            )}
          </SubSection>
        </div>
        {uris && (
          <Player access_token={session!.accessToken} track_uri={uris} />
        )}
      </section>
    </div>
  );
};

export default Content;
