import Image from 'next/image';
import HomeNav from './components/homenav';
import Intro from '@/public/images/intro.svg';

export default function Home() {
  return (
    <main className='text-my-black'>
      <HomeNav />
      <header className='relative mx-auto mb-[400px] mt-[200px] flex h-fit  w-full max-w-[1440px] flex-col items-center gap-[10px] text-center'>
        <h1 className='max-w-[670px] text-[39px] font-bold'>
          Discover <span className='text-blue-highlight'>Hidden Gems</span> From
          Music Genres <span className='text-blue-highlight'>You Enjoy</span>
        </h1>
        <h2>Explore recommended music tailored to your specific taste</h2>
        <button className='bg-blue-cta rounded-[10px] px-8 py-2 text-[14px] text-white'>
          Get Started
        </button>
        <span className='relative flex w-full justify-between px-[20px] lg:-top-12'>
          <div className='relative h-[352px] w-[461px]'>
            <Image
              className='relative left-4 top-40 object-scale-down'
              fill
              src={'/images/header-left.png'}
              alt='Girl enjoying music with headphones'
            />
          </div>
          <div className='relative top-64 h-[332px] w-[335px] lg:top-0'>
            <Image
              className='right-4 top-40 object-scale-down'
              src={'/images/header-right.png'}
              fill
              alt='Girl enjoying music with headphones'
            />
          </div>
        </span>
      </header>
      <section className='mx-auto flex max-w-[1440px] flex-col px-[40px] lg:flex-row'>
        <div className='flex-[0.5]'>
          <h1 className='text-[20px] font-medium lg:text-[25px]'>
            Harbor is where music meets personalized exploration.
          </h1>
        </div>
        <div className='flex-[0.5]'>
          <Image
            className='relative flex-[0.2] xl:-top-16'
            src={Intro}
            width={725.25}
            height={567.42}
            alt='playlists with option menu for user actions'
          />
        </div>
      </section>
    </main>
  );
}
