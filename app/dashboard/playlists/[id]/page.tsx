'use client';

import DashNav from '@/app/components/dashnav';
import MediaAdditional from '@/app/components/media/additional';
import MediaInfo from '@/app/components/media/info';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { grabAlbumData, grabPlaylistData } from '@/lib/utils/index';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split('/')[3];
  const { data: session } = useSession();
  const [playlistData, setPlaylistData] =
    useState<SpotifyApi.TrackObjectFull | null>(null);
  useEffect(() => {
    async function handlePlaylistGrab() {
      const response = await grabPlaylistData(id, session!.accessToken);
      setPlaylistData(response);
    }
    if (session && id) {
      handlePlaylistGrab();
    }
  }, [session, id]);
  return (
    <div className='page-container'>
      <DashNav />
      <ScrollArea className='w-full'>
        <section className='page-section'>
          {playlistData && (
            <>
              <MediaInfo type={'playlist'} media={playlistData} />
              {playlistData && (
                <MediaAdditional type={'playlist'} media={playlistData} />
              )}
            </>
          )}
        </section>
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </div>
  );
};

export default Page;
