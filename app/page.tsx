'use client';
import Image from 'next/image';
import HomeNav from './components/homenav';
import Footer from './components/footer';
import { useDialogStore } from './states';
import { Dialog } from '@radix-ui/react-dialog';
import DialogWrapper from './components/dialogs/dialogwrapper';
import { Button } from '@/components/ui/button';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { getAuth, signInWithCustomToken } from 'firebase/auth';
export default function Home() {
  const { isOpen } = useDialogStore();
  const { data: session } = useSession();
  useEffect(() => {
    console.log(session);
  }, [session]);

  const [user] = useAuthState(auth);
  return (
    <>
      <main className='text-my-black'>
        <HomeNav />
        <header className='relative mx-auto mb-[400px] mt-[200px] flex h-fit  w-full max-w-[1440px] flex-col items-center gap-[10px] text-center'>
          <h1 className='max-w-[670px] text-[39px] font-bold'>
            Discover <span className='text-blue-highlight'>Hidden Gems</span>{' '}
            From Music Genres{' '}
            <span className='text-blue-highlight'>You Enjoy</span>
          </h1>
          <h2>
            Generate playlists with direct context, infinitely explore related
            music
          </h2>
          <Button
            variant={'default'}
            className='z-10 rounded-[10px] bg-blue-cta px-8 py-2 text-[14px] text-white hover:bg-blue-highlight'
          >
            Get Started
          </Button>
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
        <section className='mx-auto mb-[140px] max-w-[1440px] space-y-4 px-[40px]'>
          <h1 className='text-center text-[39px]'>Why Choose Us?</h1>
          <div className='flex flex-col gap-[20px] lg:flex-row'>
            <span className='flex flex-[0.6] flex-col gap-[20px]'>
              <div className=' relative flex min-h-[321px] flex-col bg-my-black text-white 2xl:flex-row'>
                <div className='max-w-[60%] space-y-4 p-[26px]'>
                  <h1 className='text-[20px]'>
                    Playlists from harbor are generated through your unique
                    musical taste.
                  </h1>
                  <p className='text-[14px] font-light'>
                    Your input shapes our suggestions. Liking or disliking songs
                    actively influences the next playlist we curate for you.
                  </p>
                </div>
                <div className='relative left-0 top-0 h-[321px] w-full '>
                  <Image
                    className='h-[321px] object-cover'
                    src={'/images/feature-1.png'}
                    fill
                    alt='playlist of throwbacksongs'
                  />
                </div>
              </div>
              <div className=' relative flex min-h-[261px] flex-col bg-my-light-gray 2xl:flex-row'>
                <div className='max-w-[60%] space-y-4 p-[26px]'>
                  <h1 className='text-[20px]'>
                    Find your sound through popular categories.
                  </h1>
                  <p className='text-[14px] font-light'>
                    If you&apos;re unsure of what your musical taste is at this
                    moment in time, freely explore popular categories.
                  </p>
                </div>
                <div className='relative left-0 top-0 h-[321px] w-full '>
                  <Image
                    className='h-[321px]  object-cover'
                    src={'/images/feature-3.png'}
                    fill
                    alt='playlist of throwbacksongs'
                  />
                </div>
              </div>
            </span>
            <span className=' min-h-[465px] flex-[0.4] overflow-hidden bg-my-light-gray'>
              <div className=' space-y-4  p-[26px]'>
                <h1 className='text-[20px]'>
                  Let AI craft personalized playlists based on your mood and
                  preferences.
                </h1>
                <p className='text-[14px] font-light'>
                  Provide any context to create any playlist containing an
                  endless possibility of hidden gems.
                </p>
              </div>
              <div className='relative left-0 top-0 h-[465px] w-full overflow-hidden lg:h-full '>
                <Image
                  className='h-full  object-cover'
                  src={'/images/feature-2.png'}
                  fill
                  alt='playlist of throwbacksongs'
                />
              </div>
            </span>
          </div>
        </section>
        <Footer />
      </main>
      <DialogWrapper />
    </>
  );
}
