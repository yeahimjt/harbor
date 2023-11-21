import React from 'react';
import { Play } from 'lucide-react';
import { usePlayerStore } from '../states';
import { useSession } from 'next-auth/react';
interface playButtonProps {
  trackUri: string;
  redirect: string;
}
const PlayButton = ({ trackUri, redirect }: playButtonProps) => {
  console.log(trackUri);
  const { data: session } = useSession();
  const { setUris } = usePlayerStore();
  if (session?.user.product === 'free') {
    return (
      <div className='flex h-[20px] items-end justify-end '>
        <a
          target='_blank'
          rel='noreferrer'
          className='flex justify-end rounded-full bg-my-light-gray p-2'
          href={redirect}
        >
          <Play />
        </a>
      </div>
    );
  }
  return (
    <div className='flex h-[20px] items-end justify-end '>
      <button
        className='flex justify-end rounded-full bg-my-light-gray p-2'
        onClick={() => setUris(trackUri)}
      >
        <Play />
      </button>
    </div>
  );
};

export default PlayButton;
