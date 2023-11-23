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
  Radio,
  Sparkles,
} from 'lucide-react';
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { redirect, useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

const DashNav = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const handleSignOut = () => {
    signOut({ callbackUrl: 'http://localhost:3000' });
  };
  return (
    <nav className=' hidden h-screen min-w-[280px] max-w-[280px] flex-col space-y-16 border border-my-light-gray/70 bg-my-light-gray/20 px-4  py-8 text-my-dark-gray lg:flex'>
      <section className='space-y-2'>
        <Link className='flex items-center justify-center gap-[10px]' href='/'>
          <Image src='/images/icon.png' width={30} height={30} alt='logo' />
          <h3 className='text-[25px] text-blue-cta'>Harbor</h3>
        </Link>

        <h2 className='pt-4 text-[18px] font-medium text-my-black'>Discover</h2>
        <Link
          href='/dashboard/generate'
          className='flex w-full gap-[10px] p-4 hover:bg-slate-100'
        >
          <Sparkles />
          Generate
        </Link>
        <Link
          href='/dashboard'
          className='flex w-full gap-[10px] p-4 hover:bg-slate-100'
        >
          <Music />
          Listen Now
        </Link>
        <Link
          href='/dashboard/browse'
          className='flex w-full gap-[10px] p-4 hover:bg-slate-100'
        >
          <Globe />
          Browse
        </Link>
        <Link
          href='/dashboard/radio'
          className='flex w-full gap-[10px] p-4 hover:bg-slate-100'
        >
          <Radio />
          Radio
        </Link>
      </section>
      <section className='space-y-2'>
        <h2 className='text-[18px] font-medium text-my-black'>Your Library</h2>
        <Link
          href='/dashboard/playlists'
          className='flex w-full gap-[10px] p-4 hover:bg-slate-100'
        >
          <ListMusicIcon />
          Playlists
        </Link>
        <Link
          href='/dashboard/history'
          className='flex w-full gap-[10px] p-4 hover:bg-slate-100'
        >
          <History />
          History
        </Link>
      </section>

      <section className='flex w-full flex-[1] flex-col items-start justify-end space-y-2 '>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex w-full cursor-pointer gap-4 p-4 hover:bg-slate-100'>
              <Settings />
              Settings
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className=' w-56 border bg-slate-50'
            side='top'
            sideOffset={10}
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  className='flex w-full items-center gap-[2px]'
                  href='/profile'
                >
                  <User className='mr-2 h-4 w-4' />
                  <span>Profile</span>
                  {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='cursor-pointer text-error hover:text-error'
              onClick={() => handleSignOut()}
            >
              <LogOut className='mr-2 h-4 w-4' />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
    </nav>
  );
};

export default DashNav;
