'use client';
import { useDialogStore } from '@/app/states';
import { Dialog } from '@/components/ui/dialog';
import React from 'react';
import Auth from './auth';

const DialogWrapper = () => {
  const { type, isOpen, closeDialog } = useDialogStore();
  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      {type === 'auth' ? <Auth /> : ''}
    </Dialog>
  );
};

export default DialogWrapper;
