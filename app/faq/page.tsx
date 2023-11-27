import React from 'react';
import HomeNav from '../components/homenav';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Footer from '../components/footer';

const page = () => {
  return (
    <div className=''>
      <HomeNav />
      <header className='relative mx-auto mb-[100px] mt-[200px] flex h-fit w-full  max-w-[1440px] flex-col items-center gap-[10px] text-center'>
        <h1 className='max-w-[670px] text-[39px] font-bold'>
          Frequently Asked <br />
          <span className='text-blue-highlight'>Questions</span>
        </h1>
      </header>
      <section className='mx-auto mb-[200px]  max-w-[1440px] px-[40px]'>
        <Accordion type='single' collapsible className='w-full'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>What does Harbor do?</AccordionTrigger>
            <AccordionContent>
              Harbor is a web application that utilizes your pre-existing
              spotify data such as your library to further recommend you music
              that you like. Harbor does this by using OpenAI&apos;s API to
              generate 5 songs attuned to your taste, along with a playlist
              initially. You can rate these suggestions by liking or disliking
              them which will help fine-tune future recommendations. Harbor
              should be primarily used to generate new playlists given specific
              context such as: your current vibe, your current mood, or any
              favorite artits you want to hear from. These newly generated
              playlists will retrieve appropriate data from Spotify regarding
              the tracks selected, this means that you can retrieve the Spotify
              pages for these tracks with no effort; giving you a seamless
              experience from generating fresh playlists to listening to the
              tracks within them.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-2'>
            <AccordionTrigger>
              How many playlists can I currently generate?
            </AccordionTrigger>
            <AccordionContent>
              Currently all users are only able to generate a maximum of three
              playlists.This does not include the initial playlist you receive
              from setting up your account. Only playlists created specifically
              using the Generate option will count as playlists you have
              generated.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-3'>
            <AccordionTrigger>
              Is there a way to get more playlist generations?
            </AccordionTrigger>
            <AccordionContent>
              Currently there is no way to get more playlist generations. This
              application was created only to display my skills with the
              technologies it was built with. Three playlist generations was
              chosen as that felt like a good number for users testing my web
              application found from my portfolio. OpenAI API requests do
              quickly become costly and this limit ensures that more users will
              utilize this applicaiton. If there is a decent demand for
              increased playlists generations, subscriptions will be created to
              accomodate this.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-4'>
            <AccordionTrigger>How do I log into Harbor?</AccordionTrigger>
            <AccordionContent>
              Harbor utilizes Spotify for it&apos;s authentication method. To
              sign up to this application you must agree to Harbor gaining
              access to your Spotify account by setting itself as an app for
              your spotify account.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-5'>
            <AccordionTrigger>
              What does Harbor access within my Spotify account?
            </AccordionTrigger>
            <AccordionContent>
              Harbor only accesses what is absolutely needed from your spotify
              account. This includes things like your email address, your name,
              email address, and profile picture. Harbor does not have access to
              things like your Spotify password.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value='item-6'>
            <AccordionTrigger>
              Can I remove Harbor from having access within my Spotify Account?
            </AccordionTrigger>
            <AccordionContent>
              Yes, within your Spotify Account you can easily remove any access
              Harbor has at anytime you wish. To access this you can navigate to{' '}
              <a
                className='text-blue-500'
                target='_blank'
                rel='noreferrer'
                href='spotify.com/account'
              >
                spotify.com/account
              </a>{' '}
              and find the <b>Security and privacy</b> section. Here you can
              click <i>Manage apps</i>. Harbor will be under this section and by
              clicking <i>Remove Access</i> all access will be removed
              permanently.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
      <Footer />
    </div>
  );
};

export default page;
