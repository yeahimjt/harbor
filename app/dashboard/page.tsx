import React from 'react';
import DashNav from '../components/dashnav';

const Page = () => {
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

export default Page;
