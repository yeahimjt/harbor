'use client';

import DashNav from '@/app/components/dashnav';
import PageTitle from '@/app/components/pagesections/pagetitle';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React, { useEffect, useState } from 'react';
import { spotifyBaseUrl } from '@/lib/types';
import MediaWrapper from '@/app/components/media/wrapper';
import { useSession } from 'next-auth/react';
import { useInView } from 'react-intersection-observer';

const Page = () => {
  const { ref, inView } = useInView();
  const { data: session } = useSession();
  const [offset, setOffset] = useState<number>(0);
  const [topPlaylists, setTopPlaylists] =
    useState<SpotifyApi.ListOfFeaturedPlaylistsResponse | null>(null);
  useEffect(() => {
    async function grabLimitedReleasedAlbum() {
      const response = await fetch(
        spotifyBaseUrl + `browse/featured-playlists?limit=20&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${session!.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      if (topPlaylists && responseData) {
        const combinedTopAlbums = [
          ...topPlaylists.playlists.items,
          ...responseData.playlists.items,
        ];
        const newTopPlaylists: SpotifyApi.ListOfFeaturedPlaylistsResponse = {
          ...topPlaylists,
          playlists: {
            ...topPlaylists.playlists,
            items: combinedTopAlbums,
          },
        };
        setTopPlaylists(newTopPlaylists);
        setOffset(offset + 20);
      } else if (responseData) {
        setTopPlaylists(responseData);
        setOffset(offset + 20);
      }
    }
    if (inView && session && offset < 24) {
      grabLimitedReleasedAlbum();
    }
  }, [inView, session]);
  return (
    <div className='page-container overflow-x-hidden'>
      <DashNav />
      <ScrollArea className='w-full overflow-x-hidden'>
        <div className='page-section'>
          <PageTitle title={'Top Albums'} />
          {topPlaylists && (
            <MediaWrapper
              title=''
              type='playlist-spotify'
              media={topPlaylists}
              overflow={false}
            />
          )}
          <span ref={ref} className='h-[200px] w-full text-center'>
            {offset < 24 ? 'Fetching more data...' : 'No more data to fetch.'}
          </span>
        </div>
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </div>
  );
};

export default Page;
