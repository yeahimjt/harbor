import Link from 'next/link';
import React from 'react';

const HomeNav = () => {
  return (
    <nav className='home-nav text-my-black'>
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
      <Link
        className='border-blue-cta rounded-[20px] border px-8 py-2'
        href='/sign-up'
      >
        Sign Up
      </Link>
    </nav>
  );
};

export default HomeNav;
