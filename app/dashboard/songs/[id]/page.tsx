'use client';

import DashNav from '@/app/components/dashnav';
import PageTitle from '@/app/components/pagesections/pagetitle';
import SubSection from '@/app/components/pagesections/subsection';
import PlayButton from '@/app/components/play';
import Player from '@/app/components/player';
import { Button } from '@/components/ui/button';
import { grabSongData } from '@/lib/utils/index';
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
  useEffect(() => {
    async function handleGrabSongData() {
      const response = await grabSongData(id, session!.accessToken);
      setSongData(response);
    }
    if (session) {
      handleGrabSongData();
    }
  }, [session, id]);
  console.log(songData);
  return (
    <div className='page-container'>
      <DashNav />
      <section className='page-section'>
        {songData && (
          <>
            <section className='flex gap-4'>
              <Image
                src={songData.album.images[0].url || ''}
                alt={songData.name || 'song image'}
                width={300}
                height={300}
              />
              <section className='flex w-full flex-col justify-between'>
                <div>
                  <h2>{songData.type}</h2>
                  <h1>{songData.name}</h1>
                  <a
                    className='mb-8 underline underline-offset-2'
                    href={songData.album.href}
                  >
                    {songData.album.name}
                  </a>

                  <span className='mt-4 flex gap-2'>
                    {songData.artists.map((artist, index) => (
                      <Button
                        className='bg-blue-cta p-2 text-[12px] hover:bg-blue-highlight'
                        key={index}
                      >
                        {artist.name}
                      </Button>
                    ))}
                  </span>
                </div>
                <div className='flex items-center justify-between '>
                  <div></div>
                  <PlayButton
                    size={40}
                    trackUri={songData.uri}
                    redirect={songData.external_urls.spotify}
                  />
                </div>
              </section>
            </section>
            <SubSection sub_title='Similar Tracks' redirect={undefined}>
              <>hey</>
            </SubSection>
          </>
        )}
      </section>
    </div>
  );
};

export default Page;
