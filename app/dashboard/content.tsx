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
import { Separator } from '@/components/ui/separator';
import PageTitle from '../components/pagesections/pagetitle';
import SubSection from '../components/pagesections/subsection';
import ListenNow from '../components/pagesections/songoverflow';
import SongOverflow from '../components/pagesections/songoverflow';
import MediaWrapper from '../components/media/wrapper';
import { Button } from '@/components/ui/button';

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
  console.log(session);
  return (
    <div className='page-container overflow-x-hidden'>
      <DashNav />
      <section className='w-full overflow-x-hidden'>
        <div className='page-section'>
          <PageTitle title='Listen Now' />
          {listenNow && listenNow.playlists ? (
            <>
              {listenNow?.songs && (
                <MediaWrapper
                  type={'track'}
                  title={'Your Generated Tracks'}
                  information={
                    'These tracks will be removed from this section once you have rated them. Upon rating them, your future playlists/song recommendations will be tailored based on these five tracks. New tracks will not be generated only playlists.'
                  }
                  media={listenNow.songs}
                  overflow={true}
                />
              )}

              {listenNow?.playlists && (
                <MediaWrapper
                  type={'playlist-generated'}
                  redirect={'/dashboard/playlists'}
                  title={'Your Generated Playlists'}
                  media={listenNow.playlists}
                  overflow={true}
                />
              )}
            </>
          ) : (
            ''
          )}
        </div>
        {uris && (
          <Player access_token={session!.accessToken} track_uri={uris} />
        )}
      </section>
    </div>
  );
};

export default Content;
