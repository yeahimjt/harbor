import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='m-[10px] mt-64  flex max-w-[1440px] flex-col gap-[40px] bg-my-black px-[80px] py-[40px] text-white sm:m-[40px] 2xl:mx-auto'>
      <section className='flex flex-col justify-between gap-[20px] lg:flex-row'>
        <div className='flex-[0.6]'>
          <h1 className='text-[20px]'>Sign up for our newsletter</h1>
          <p className='font-light'>
            Stay up to date with our latest news and announcements
          </p>
        </div>
        <div className='flex flex-[0.4] gap-[20px]'>
          <Input placeholder='Sign up for email notifications' />
          <Button className='bg-blue-cta hover:bg-blue-highlight'>
            Submit
          </Button>
        </div>
      </section>
      <section className='flex flex-col justify-between gap-[40px] lg:flex-row'>
        <Link className='flex items-start gap-[20px]' href='/'>
          <Image
            className='object-scale-down'
            src={'/images/icon.png'}
            width={45}
            height={45}
            alt='harbor logo'
          />
          <h1 className='text-[25px] font-bold'>Harbor</h1>
        </Link>
        <span className='flex flex-col space-y-2'>
          <h1 className='text-[18px]'>Navigation</h1>
          <a className='cursor-not-allowed font-light text-my-mid-gray'>
            Subscriptions
          </a>
          <Link className='font-light' href='/faq'>
            FAQ
          </Link>
        </span>
        <span className='flex flex-col space-y-2'>
          <h1>Contact</h1>
          <a className='font-light' href='mailto:yeahimjt@gmail.com'>
            harbor-support@gmail.com
          </a>
        </span>
      </section>
      <Separator />
      <div className='flex justify-between text-[12px] md:text-[16px]'>
        <h3>Rights Reserved To Harbor</h3>
        <h4>Created By Jonathan Trevino</h4>
      </div>
    </footer>
  );
};

export default Footer;
