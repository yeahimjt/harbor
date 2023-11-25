'use client';

import DashNav from '@/app/components/dashnav';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { grabAlbumData } from '@/lib/utils/index';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split('/')[3];
  const { data: session } = useSession();
  const [albumData, setAlbumData] = useState<SpotifyApi.TrackObjectFull | null>(
    null
  );
  useEffect(() => {
    async function handleAlbumGrab() {
      const response = await grabAlbumData(id, session!.accessToken);
      setAlbumData(response);
    }
    if (id) {
      handleAlbumGrab();
    }
  }, [id]);
  return (
    <div className='page-container'>
      <DashNav />
      <ScrollArea>
        <section className='page-section'></section>
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </div>
  );
};

export default Page;
