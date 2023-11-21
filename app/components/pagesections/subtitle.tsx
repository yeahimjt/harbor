import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import React, { ReactNode } from 'react';

interface subSection {
  sub_title: string;
  redirect: string;
  children: ReactNode;
}
const SubSection = ({ sub_title, redirect, children }: subSection) => {
  return (
    <div className='space-y-4 text-my-dark-gray'>
      <Link
        href={redirect}
        className='flex w-fit items-center gap-2 text-[18px]'
      >
        {sub_title} <ChevronRight className='text-my-mid-gray' />
      </Link>
      {children}
    </div>
  );
};

export default SubSection;
