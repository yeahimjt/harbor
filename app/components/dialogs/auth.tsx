import { DialogContent, DialogHeader } from '@/components/ui/dialog';
import React, { FormEvent, useEffect, useState } from 'react';
import AuthButtons from '../authbuttons';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase';
import { useDialogStore } from '@/app/states';

const Auth = () => {
  const [user, isLoading] = useAuthState(auth);
  const { closeDialog, isOpen } = useDialogStore();

  useEffect(() => {
    if (user) {
      closeDialog();
    }
  }, [user, isOpen]);

  return (
    <DialogContent>
      <DialogHeader className='mx-auto my-2'>
        <AuthButtons />
      </DialogHeader>
    </DialogContent>
  );
};

export default Auth;
