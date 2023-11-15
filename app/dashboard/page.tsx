'use client';
import React, { useEffect, useState } from 'react';
import DashNav from '../components/dashnav';
import * as z from 'zod';
import { checkUserStatus, userStatusUpdate } from '@/lib/utils/index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  genres: z.string().array(),
  artists: z.string().array(),
  context: z.string(),
});

const Page = () => {
  const [user] = useAuthState(auth);
  const [userSetupCompleted, setUserSetupCompleted] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    async function checkSetupCompleted() {
      const setupCompleted = await checkUserStatus(user!.uid);
      if (setupCompleted) {
        setUserSetupCompleted(true);
      } else {
        setUserSetupCompleted(false);
      }
    }
    if (user) {
      console.log(user.uid);
      checkSetupCompleted();
    }
  }, []);
  function onSubmit(e: any) {
    e.preventDefault();
    setUserSetupCompleted(true);
    userStatusUpdate(user!.uid);
  }

  return (
    <>
      {userSetupCompleted === false ? (
        <div className='mx-auto flex h-screen max-w-[640px] items-center justify-center'>
          <section className='w-full space-y-8 text-my-dark-gray'>
            <span>
              <h1 className='text-[25px] font-semibold text-my-black'>
                Welcome to Harbor!
              </h1>
              <p className=''>
                Complete this quick preferences setup to start finding new
                music. This can always be changed later.
              </p>
            </span>
            <form className='space-y-8' onSubmit={(e) => onSubmit(e)}>
              <section className='space-y-2'>
                <label>Full Name</label>
                <Input placeholder='First Last' />
              </section>
              <section className='space-y-2'>
                <label>Genres You Enjoy</label>
                <ToggleGroup
                  variant='outline'
                  className='flex flex-wrap'
                  type='multiple'
                >
                  <ToggleGroupItem value='rock'>Rock</ToggleGroupItem>
                  <ToggleGroupItem value='pop'>Pop</ToggleGroupItem>
                  <ToggleGroupItem value='hip-hop'>
                    Hip-Hop / Rap
                  </ToggleGroupItem>
                  <ToggleGroupItem value='electronic'>
                    Electronic
                  </ToggleGroupItem>
                  <ToggleGroupItem value='jazz'>Jazz</ToggleGroupItem>
                  <ToggleGroupItem value='blues'>Blues</ToggleGroupItem>
                  <ToggleGroupItem value='country'>Country</ToggleGroupItem>
                  <ToggleGroupItem value='r&b'>R&B</ToggleGroupItem>
                  <ToggleGroupItem value='reggae'>Reggae</ToggleGroupItem>
                  <ToggleGroupItem value='classical'>Classical</ToggleGroupItem>
                  <ToggleGroupItem value='gospel'>Gospel</ToggleGroupItem>
                  <ToggleGroupItem value='experimental'>
                    Experimental
                  </ToggleGroupItem>
                </ToggleGroup>
              </section>
              <section className='space-y-2'>
                <label>
                  Provide context you wish streaming services knew about you
                </label>
                <Textarea placeholder='When I feel like I need to boss up I usually listen to artists with a similar sound to Westside Gunn, and Conway the Machine. When I feel like I need to sit with my thoughts to relax, I enjoy hearing music that is spacey. I do not like opera music!' />
              </section>
              <span className='flex items-center justify-center gap-[20px]'>
                <button
                  className='rounded-[10px] bg-blue-cta px-8 py-2 text-white hover:bg-blue-highlight'
                  type='submit'
                >
                  Submit
                </button>
                <button
                  type='submit'
                  className='text-end underline hover:scale-[1.05]'
                >
                  Skip this step
                </button>
              </span>
            </form>
            <span className='flex justify-end'></span>
          </section>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Page;
