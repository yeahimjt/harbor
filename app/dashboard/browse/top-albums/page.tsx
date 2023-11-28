'use client';

import DashNav from '@/app/components/dashnav';
import PageTitle from '@/app/components/pagesections/pagetitle';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React, { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { spotifyBaseUrl } from '@/lib/types';
import MediaWrapper from '@/app/components/media/wrapper';
import { useSession } from 'next-auth/react';
import { useInView } from 'react-intersection-observer';

const Page = () => {
  const { ref, inView } = useInView();
  const { data: session } = useSession();
  const [offset, setOffset] = useState<number>(0);
  const [topAlbums, setTopAlbums] =
    useState<SpotifyApi.ListOfNewReleasesResponse | null>(null);
  useEffect(() => {
    async function grabLimitedReleasedAlbum() {
      const response = await fetch(
        spotifyBaseUrl + `browse/new-releases?limit=20&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${session!.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      if (topAlbums && responseData) {
        const combinedTopAlbums = [
          ...topAlbums.albums.items,
          ...responseData.albums.items,
        ];
        const newTopAlbums: SpotifyApi.ListOfNewReleasesResponse = {
          ...topAlbums,
          albums: {
            ...topAlbums.albums,
            items: combinedTopAlbums,
          },
        };
        setTopAlbums(newTopAlbums);
        setOffset(offset + 20);
      } else if (responseData) {
        setTopAlbums(responseData);
        setOffset(offset + 20);
      }
    }
    if (inView && session && offset < 100) {
      grabLimitedReleasedAlbum();
    }
  }, [inView, session]);
  return (
    <div className='page-container overflow-x-hidden'>
      <DashNav />
      <ScrollArea className='w-full overflow-x-hidden'>
        <div className='page-section'>
          <PageTitle title={'Top Albums'} />
          {topAlbums && (
            <MediaWrapper
              title=''
              type='album-spotify'
              media={topAlbums}
              overflow={false}
            />
          )}
          <span ref={ref} className='h-[200px] w-full text-center'>
            {offset < 100 ? 'Fetching more data...' : 'No more data to fetch.'}
          </span>
        </div>
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </div>
  );
};

export default Page;
