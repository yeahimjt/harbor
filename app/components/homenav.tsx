'use client';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
const HomeNav = () => {
  // const [user, isLoading] = useAuthState(auth);
  const { data: session } = useSession();
  const router = useRouter();
  const handleOpen = () => {
    router.push('/signIn');
  };
  const handleRedirect = () => {
    router.push('/dashboard');
  };
  return (
    <nav className='home-nav'>
      <div className='home-nav-left'>
        <Link className='text-[25px] font-bold' href='/'>
          Harbor
        </Link>
        <span className=' hidden gap-[54px] lg:flex'>
          <p className='cursor-not-allowed text-[18px] font-medium text-my-mid-gray'>
            Subscriptions
          </p>
          <Link className='text-[18px] font-medium' href='/faq'>
            FAQ
          </Link>
        </span>
      </div>
      {session ? (
        <Button
          variant='ghost'
          className='text-[18px] hover:bg-blue-cta hover:text-white'
          onClick={() => handleRedirect()}
        >
          Dashboard
        </Button>
      ) : (
        <Button
          variant='ghost'
          className='text-[18px] hover:bg-blue-cta hover:text-white'
          onClick={() => handleOpen()}
        >
          Sign Up
        </Button>
      )}
    </nav>
  );
};

export default HomeNav;
