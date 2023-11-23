'use client';

import { spotifyBaseUrl } from '@/lib/constants';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const PlaylistsFlow = () => {
  const { data: session } = useSession();
  const [limitedData, setLimitedData] =
    useState<SpotifyApi.ListOfFeaturedPlaylistsResponse | null>(null);
  useEffect(() => {
    async function grabLimitedReleased() {
      const response = await fetch(
        spotifyBaseUrl + 'browse/featured-playlists?limit=8',
        {
          headers: {
            Authorization: `Bearer ${session!.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      console.log(responseData);
      setLimitedData(responseData);
    }
    if (session) {
      grabLimitedReleased();
    }
  }, [session]);

  return (
    <section className='flex flex-wrap  gap-4 '>
      {limitedData?.playlists.items.map((playlist: any, index: number) => (
        <section
          className='h-[240px] w-[200px] space-y-2 lg:h-[300px] lg:w-[250px]'
          key={index}
        >
          <div className='img-hover-zoom h-[200px] cursor-pointer flex-wrap lg:flex-nowrap '>
            <Image
              className=''
              src={playlist.images[0].url}
              height={300}
              width={300}
              alt=''
            />
          </div>
          <div className='h-full'>
            <h2 className='h-[24px] truncate'>{playlist.name}</h2>
            <h3 className='text-[14px]'>{playlist.owner.name}</h3>
          </div>
        </section>
      ))}
    </section>
  );
};

export default PlaylistsFlow;
