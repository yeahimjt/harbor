'use client';

import React from 'react';
import HomeNav from '../components/homenav';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const SignInPage = () => {
  return (
    <div>
      <HomeNav />
      <section className='mx-auto mt-[200px] flex max-w-[1440px]  justify-center px-[40px]'>
        <Button
          className='flex gap-4 p-6 text-[18px]'
          variant={'outline'}
          onClick={() => signIn('spotify', { callbackUrl: '/' })}
        >
          <Image
            src={'/images/spotify_logo.png'}
            width={35}
            height={35}
            alt='spotify logo'
          />
          Sign In With Spotify
        </Button>
      </section>
    </div>
  );
};

export default SignInPage;
