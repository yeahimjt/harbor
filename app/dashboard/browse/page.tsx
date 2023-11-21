'use client';

import DashNav from '@/app/components/dashnav';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Songs from '@/public/icons/songs.svg';
import Albums from '@/public/icons/albums.svg';
import Playlists from '@/public/icons/playlists.svg';
import { spotifyBaseUrl } from '@/lib/constants';
import { useSession } from 'next-auth/react';
import PageTitle from '@/app/components/pagesections/pagetitle';
import SubSection from '@/app/components/pagesections/subtitle';
import PlaylistsFlow from '@/app/components/pagesections/playlistflow';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import AlbumFlow from '@/app/components/pagesections/albumflow';
const Page = () => {
  return (
    <div className='page-container'>
      <DashNav />
      <ScrollArea className='w-full'>
        <section className='w-full overflow-x-hidden'>
          <div className='page-section overflow-y-hidden'>
            <PageTitle title='Browse' />
            <SubSection
              sub_title='Popular Categories'
              redirect='popular-categories'
            >
              <div className='space-y-2 overflow-y-hidden text-my-black'>
                <section className='flex flex-wrap gap-4'>
                  <Link
                    className='flex min-w-[333px] flex-[1] flex-col space-y-4 rounded-[40px] border border-my-light-gray/80 bg-slate-50 px-[51px] py-[56px] hover:bg-slate-100'
                    href='/top-songs'
                  >
                    <Image src={Songs} width={65} height={65} alt='song icon' />
                    <div>
                      <h2 className='text-[17px]'>Top Songs</h2>
                      <p className='text-[15px]'>World top chart songs lists</p>
                    </div>
                  </Link>
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
            <SubSection sub_title='Hottest Releases' redirect='hot-releases'>
              <AlbumFlow />
            </SubSection>
            <SubSection sub_title='Perfectly Crafted' redirect='hot-playlists'>
              <PlaylistsFlow />
            </SubSection>
          </div>
        </section>
        <ScrollBar orientation='vertical' />
      </ScrollArea>
    </div>
  );
};

export default Page;
