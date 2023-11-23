import DashNav from '@/app/components/dashnav';
import PageTitle from '@/app/components/pagesections/pagetitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

const Page = () => {
  return (
    <div className='page-container'>
      <DashNav />
      <section className='page-section'>
        <PageTitle title='Generate' />
        <span className='flex gap-4'>
          <Input placeholder='Tell us your vibe, mood, or favorite artists.' />
          <Button>Generate</Button>
        </span>
      </section>
    </div>
  );
};

export default Page;
