'use client';
import React from 'react';
import DashNav from '../components/dashnav';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Page = () => {
  return (
    <div className='page-container'>
      <DashNav />
      <section className='page-section'>
        <h1 className='text-[18px]'>Profile</h1>
        <button onClick={() => signOut(auth)}>Sign Out</button>
      </section>
    </div>
  );
};

export default Page;
