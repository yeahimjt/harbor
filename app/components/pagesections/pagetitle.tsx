import { Separator } from '@/components/ui/separator';
import React from 'react';
interface pageTitleProps {
  title: string;
}
const PageTitle = ({ title }: pageTitleProps) => {
  return (
    <section className='space-y-4'>
      <span className='space-y-2'>
        <h1>{title}</h1>
        <Separator />
      </span>
    </section>
  );
};

export default PageTitle;
