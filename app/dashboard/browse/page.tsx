'use client';

import DashNav from '@/app/components/dashnav';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Songs from '@/public/icons/songs.svg';
import Albums from '@/public/icons/albums.svg';
import Playlists from '@/public/icons/playlists.svg';
import { spotifyBaseUrl } from '@/lib/types';
import { useSession } from 'next-auth/react';
import PageTitle from '@/app/components/pagesections/pagetitle';
import SubSection from '@/app/components/pagesections/subsection';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import MediaWrapper from '@/app/components/media/wrapper';
const Page = () => {
  const { data: session } = useSession();
  const [limitedDataAlbum, setLimitedDataAlbum] =
    useState<SpotifyApi.ListOfNewReleasesResponse | null>(null);
  const [limitedDataPlaylist, setLimitedDataPlaylist] =
    useState<SpotifyApi.ListOfFeaturedPlaylistsResponse | null>(null);

  useEffect(() => {
    async function grabLimitedReleasedAlbum() {
      const response = await fetch(
        spotifyBaseUrl + 'browse/new-releases?limit=8',
        {
          headers: {
            Authorization: `Bearer ${session!.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      setLimitedDataAlbum(responseData);
    }
    async function grabLimitedReleasedPlaylist() {
      const response = await fetch(
        spotifyBaseUrl + 'browse/featured-playlists?limit=8',
        {
          headers: {
            Authorization: `Bearer ${session!.accessToken}`,
          },
        }
      );
      const responseData = await response.json();
      setLimitedDataPlaylist(responseData);
    }
    if (session) {
      grabLimitedReleasedAlbum();
      grabLimitedReleasedPlaylist();
    }
  }, [session]);
  return (
    <div className='page-container'>
      <DashNav />
      <ScrollArea className='w-full'>
        <section className='w-full overflow-x-hidden'>
          <div className='page-section'>
            <PageTitle title='Browse' />
            <SubSection
              sub_title='Popular Categories'
              redirect='popular-categories'
            >
              <div className='space-y-2  text-my-black'>
                <section className='flex flex-wrap gap-4'>
                  {/* <Link
                    className='flex min-w-[333px] flex-[1] flex-col space-y-4 rounded-[40px] border border-my-light-gray/80 bg-slate-50 px-[51px] py-[56px] hover:bg-slate-100'
                    href='/top-songs'
                  >
                    <Image src={Songs} width={65} height={65} alt='song icon' />
                    <div>
                      <h2 className='text-[17px]'>Top Songs</h2>
                      <p className='text-[15px]'>World top chart songs lists</p>
                    </div>
                  </Link> */}
                  <Link
                    className='flex min-w-[333px] flex-[1] flex-col space-y-4 rounded-[40px] border border-my-light-gray/80 bg-slate-50 px-[51px] py-[56px] hover:bg-slate-100'
                    href='/dashboard/browse/top-albums'
                  >
                    <Image
                      src={Albums}
                      width={65}
                      height={65}
                      alt='song icon'
                    />
                    <div>
                      <h2 className='text-[17px]'>Top Albums</h2>
                      <p className='text-[15px]'>
                        World top chart albums lists
                      </p>
                    </div>
                  </Link>
                  <Link
                    className='flex min-w-[333px] flex-[1] flex-col space-y-4 rounded-[40px] border border-my-light-gray/80 bg-slate-50 px-[51px] py-[56px] hover:bg-slate-100'
                    href='/dashboard/browse/top-playlists'
                  >
                    <Image
                      src={Playlists}
                      width={65}
                      height={65}
                      alt='song icon'
                    />
                    <div>
                      <h2 className='text-[17px]'>Top Playlists</h2>
                      <p className='text-[15px]'>
                        World top chart playlists lists
                      </p>
                    </div>
                  </Link>
                </section>
              </div>
            </SubSection>
            {limitedDataAlbum && (
              <MediaWrapper
                type='album-spotify'
                title='Hottest Releases'
                redirect={`/dashboard/browse/top-albums`}
                media={limitedDataAlbum}
                overflow={false}
              />
            )}
            {limitedDataPlaylist && (
              <MediaWrapper
                type='playlist-spotify'
                title='Perfectly Crafted'
                redirect={`/dashboard/browse/top-playlists`}
                media={limitedDataPlaylist}
                overflow={false}
              />
            )}
          </div>
        </section>
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </div>
  );
};

export default Page;
