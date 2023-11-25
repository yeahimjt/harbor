'use client';

import DashNav from '@/app/components/dashnav';
import MediaAdditional from '@/app/components/media/additional';
import MediaInfo from '@/app/components/media/info';
import SubSection from '@/app/components/pagesections/subsection';
import PlayButton from '@/app/components/play';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { grabAlbumData } from '@/lib/utils/index';
import { MoreVertical, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split('/')[3];
  const { data: session } = useSession();
  const [albumData, setAlbumData] = useState<SpotifyApi.AlbumObjectFull | null>(
    null
  );

  useEffect(() => {
    async function handleAlbumGrab() {
      const response = await grabAlbumData(id, session!.accessToken);
      setAlbumData(response);
    }
    if (id && session) {
      handleAlbumGrab();
    }
  }, [session, id]);
  return (
    <div className='page-container '>
      <DashNav />
      <ScrollArea className='w-full'>
        <section className='page-section  '>
          {albumData && (
            <>
              <MediaInfo type={'album'} media={albumData} />
              {albumData && (
                <MediaAdditional type={'album'} media={albumData} />
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
