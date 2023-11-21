import DashNav from '@/app/components/dashnav';
import PageSection from '@/app/components/pagesections/pagesection';
import React from 'react';

const page = () => {
  return (
    <div className='page-container overflow-x-hidden'>
      <DashNav />
      <section className='w-full overflow-x-hidden'>
        <div className='page-section'>
          <PageSection
            type='top_albums'
            title='Top Albums'
            subtitle={'Trending albums'}
            content={undefined}
          />
        </div>
      </section>
    </div>
  );
};

export default page;
