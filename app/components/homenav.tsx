'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { useDialogStore } from '../states';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
const HomeNav = () => {
  const { openDialog, setType, type } = useDialogStore();
  const [user, isLoading] = useAuthState(auth);
  const router = useRouter();
  const handleOpen = () => {
    setType('auth');
    openDialog();
  };
  const handleRedirect = () => {
    console.log('in here');
    router.push('/dashboard');
  };
  return (
    <nav className='home-nav'>
      <div className='home-nav-left'>
        <Link className='text-[25px] font-bold' href='/'>
          Harbor
        </Link>
        <span className=' hidden gap-[54px] lg:flex'>
          <Link className='text-[18px] font-medium' href='/'>
            Subscriptions
          </Link>
          <Link className='text-[18px] font-medium' href='/'>
            FAQ
          </Link>
          <Link className='text-[18px] font-medium' href='/'>
            Support
          </Link>
        </span>
      </div>
      {user && !isLoading ? (
        <Button
          variant='ghost'
          className='hover:bg-blue-cta text-[18px] hover:text-white'
          onClick={() => handleRedirect()}
        >
          Dashboard
        </Button>
      ) : (
        <Button
          variant='ghost'
          className='hover:bg-blue-cta text-[18px] hover:text-white'
          onClick={() => handleOpen()}
        >
          Sign Up
        </Button>
      )}
    </nav>
  );
};

export default HomeNav;
