'use client';

import DashNav from '@/app/components/dashnav';
import MediaAdditional from '@/app/components/media/additional';
import MediaInfo from '@/app/components/media/info';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  grabAlbumData,
  grabPlaylistData,
  grabPlaylistGeneratedData,
} from '@/lib/utils/index';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const pathname = usePathname();
  const id = decodeURI(pathname.split('/')[3]);
  const { data: session } = useSession();
  const [playlistData, setPlaylistData] = useState<null>(null);
  useEffect(() => {
    async function handlePlaylistGeneratedGrab() {
      const response = await grabPlaylistGeneratedData(id, session!.user.uid);
      setPlaylistData(response);
    }
    if (session && id) {
      handlePlaylistGeneratedGrab();
    }
  }, [session, id]);
  console.log(playlistData);
  return (
    <div className='page-container'>
      <DashNav />
      <ScrollArea className='w-full'>
        <section className='page-section'>
          {playlistData && (
            <>
              <MediaInfo type={'playlist-generated'} media={playlistData} />
              {playlistData && (
                <MediaAdditional
                  type={'playlist-generated'}
                  media={playlistData}
                />
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
