import { Button } from '@/components/ui/button';
import { auth } from '@/app/firebase';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useDialogStore } from '../states';
import { Separator } from '@/components/ui/separator';
import SpotifyProvider from 'next-auth/providers/spotify';

const AuthButtons = () => {
  const [signInWithGoogle, userGoogle, errorGoogle] = useSignInWithGoogle(auth);
  const { closeDialog } = useDialogStore();
  useEffect(() => {
    if (userGoogle) {
      closeDialog();
    }
  }, [userGoogle]);
  return (
    <div className='flex flex-col justify-center gap-8 pt-4'>
      <div className='space-y-4'>
        <h1 className='text-[20px] font-medium'>
          Log In To Access Application
        </h1>
        <Separator />
      </div>
      <Button
        variant={'outline'}
        className='flex gap-[20px] rounded-[10px] bg-my-light-gray/50 p-6 hover:bg-my-light-gray'
        onClick={() => signInWithGoogle()}
      >
        <Image
          src='/icons/google.png'
          width={45}
          height={45}
          alt='google sign in option'
        />
        <h3>Use Testing Spotify Account</h3>
      </Button>
      <a
        href='/api/auth/signin'
        className='flex gap-[20px] rounded-[10px] bg-my-light-gray/50 p-6 hover:bg-my-light-gray'
        onClick={() => signInWithGoogle()}
      >
        <Image
          src='/icons/google.png'
          width={45}
          height={45}
          alt='google sign in option'
        />
        <h3>Log In With Spotify Account</h3>
      </a>
      {/* {errorGoogle && <p className='text-red-500'></p>} */}
    </div>
  );
};

export default AuthButtons;
