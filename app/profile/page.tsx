import React from 'react';
import DashNav from '../components/dashnav';

const Page = () => {
  return (
    <div className='page-container'>
      <DashNav />
      <section className='page-section'>
        <h1 className='text-[18px]'>Profile</h1>
      </section>
    </div>
  );
};

export default Page;
