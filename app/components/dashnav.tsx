'use client';

import { Button } from '@/components/ui/button';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  Globe,
  History,
  ListMusicIcon,
  Music,
  PlusCircle,
  Radio,
  User,
} from 'lucide-react';

const DashNav = () => {
  const [user] = useAuthState(auth);
  return (
    <nav className='flex h-screen min-w-[280px] max-w-[280px] flex-col space-y-16 border  px-4 py-8 text-my-dark-gray'>
      <section className='space-y-2'>
        <Link className='flex items-center justify-center gap-[10px]' href='/'>
          <Image src='/images/icon.png' width={30} height={30} alt='logo' />
          <h3 className='text-[25px] text-blue-cta'>Harbor</h3>
        </Link>
        <hr />
        <h2 className='pt-4 text-[18px] font-medium text-my-black'>Discover</h2>
        <Link
          href='/dashboard'
          className='flex w-full gap-[10px] p-4 hover:bg-slate-50'
        >
          <Music />
          Listen Now
        </Link>
        <Link
          href='/dashboard/browse'
          className='flex w-full gap-[10px] p-4 hover:bg-slate-50'
        >
          <Globe />
          Browse
        </Link>
        <Link
          href='/dashboard/radio'
          className='flex w-full gap-[10px] p-4 hover:bg-slate-50'
        >
          <Radio />
          Radio
        </Link>
      </section>
      <section className='space-y-2'>
        <h2 className='text-[18px] font-medium text-my-black'>Library</h2>
        <Link
          href='/dashboard/playlists'
          className='flex w-full gap-[10px] p-4 hover:bg-slate-50'
        >
          <ListMusicIcon />
          Playlists
        </Link>
        <Link
          href='/dashboard/history'
          className='flex w-full gap-[10px] p-4 hover:bg-slate-50'
        >
          <History />
          History
        </Link>
      </section>

      <section className='flex w-full flex-[1] flex-col items-start justify-end space-y-2 '>
        <h2 className='text-[18px] font-medium text-my-black'>Settings</h2>
        <Link
          href='/profile'
          className='flex w-full gap-[10px] p-4 hover:bg-slate-50'
        >
          <User />
          Profile
        </Link>
      </section>
    </nav>
  );
};

export default DashNav;
