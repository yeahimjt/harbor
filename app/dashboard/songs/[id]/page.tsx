'use client';

import DashNav from '@/app/components/dashnav';
import MediaInfo from '@/app/components/media/info';
import SongFlow from '@/app/components/pagesections/songflow';
import SubSection from '@/app/components/pagesections/subsection';
import PlayButton from '@/app/components/play';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { grabSimilarSongData, grabSongData } from '@/lib/utils/index';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MoreVertical, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const pathname = usePathname();
  const id = pathname.split('/')[3];
  const { data: session } = useSession();
  const [songData, setSongData] = useState<SpotifyApi.TrackObjectFull | null>(
    null
  );

  const [similarSongData, setSimilarSongData] =
    useState<SpotifyApi.RecommendationsObject | null>(null);
  useEffect(() => {
    async function handleGrabSongData() {
      const response = await grabSongData(id, session!.accessToken);
      setSongData(response);
    }
    async function handleGrabSimilarSongsData() {
      const response = await grabSimilarSongData(id, session!.accessToken);
      setSimilarSongData(response);
    }
    if (session) {
      handleGrabSongData();
      handleGrabSimilarSongsData();
    }
  }, [session]);

  console.log(similarSongData);
  return (
    <div className='page-container'>
      <DashNav />
      <ScrollArea>
        <section className='page-section'>
          {songData && (
            <>
              <MediaInfo type='track' media={songData} />

              <SubSection sub_title='Similar Tracks' redirect={undefined}>
                {similarSongData && <SongFlow songs={similarSongData} />}
              </SubSection>
            </>
          )}
        </section>
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </div>
  );
};

export default Page;
