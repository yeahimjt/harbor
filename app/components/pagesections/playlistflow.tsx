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

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    // Add event listener when component mounts
    window.addEventListener('resize', handleResize);

    // Remove event listener when component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <section className='flex flex-wrap  gap-4 '>
      {limitedData?.playlists.items.map((playlist: any, index: number) => (
        <section
          className='h-[280px] w-[200px] space-y-2 lg:h-[380px] lg:w-[250px]'
          key={index}
        >
          <div className='img-hover-zoom h-[200px] cursor-pointer flex-wrap lg:flex-nowrap '>
            <Image
              className=''
              src={playlist.images[0].url}
              height={windowSize.height > 1024 ? 300 : 200}
              width={windowSize.width > 1024 ? 300 : 200}
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
