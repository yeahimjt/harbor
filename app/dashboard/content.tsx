'use client';
import React, { useEffect } from 'react';
import DashNav from '../components/dashnav';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Content = () => {
  const [user] = useAuthState(auth);
  useEffect(() => {}, []);
  return (
    <div className='page-container'>
      <DashNav />
      <div className='page-section'>
        <section className='space-y-4'>
          <span className='space-y-1'>
            <h1>Listen Now</h1>
            <p>Top picks for you. Updated daily.</p>
          </span>
          <hr className='' />
        </section>
      </div>
    </div>
  );
};

export default Content;
