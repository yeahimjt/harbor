import { Button } from '@/components/ui/button';
import { auth } from '@/app/firebase';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useDialogStore } from '../states';

const AuthButtons = () => {
  const [signInWithGoogle, userGoogle, errorGoogle] = useSignInWithGoogle(auth);
  const { closeDialog } = useDialogStore();
  console.log(userGoogle);
  useEffect(() => {
    if (userGoogle) {
      closeDialog();
    }
  }, [userGoogle]);
  return (
    <div className='flex justify-center pt-4'>
      <Button
        variant={'outline'}
        className='bg-my-light-gray/50 hover:bg-my-light-gray flex gap-[20px] rounded-[10px] p-6'
        onClick={() => signInWithGoogle()}
      >
        <Image
          src='/icons/google.png'
          width={45}
          height={45}
          alt='google sign in option'
        />
        <h3>Log In With Google Account</h3>
      </Button>
      {/* {errorGoogle && <p className='text-red-500'></p>} */}
    </div>
  );
};

export default AuthButtons;
