import React from 'react';
import { Play } from 'lucide-react';
import { usePlayerStore } from '../states';
import { useSession } from 'next-auth/react';
interface playButtonProps {
  trackUri: string;
  redirect: string;
  size: number;
}
const PlayButton = ({ trackUri, redirect, size }: playButtonProps) => {
  // if (session?.user.product === 'free') {
  return (
    <div className={`flex  items-end justify-end `}>
      <a
        target='_blank'
        rel='noreferrer'
        className='flex justify-end rounded-full bg-my-light-gray p-2'
        href={redirect}
      >
        <Play size={size} />
      </a>
    </div>
  );
  // }
  // return (
  //   <div className={`flex items-end justify-end `}>
  //     <button
  //       className='flex justify-end rounded-full bg-my-light-gray p-2'
  //       onClick={() => setUris(trackUri)}
  //     >
  //       <Play className='h-[200px]' />
  //     </button>
  //   </div>
  // );
};

export default PlayButton;
