import React from 'react';
import { Play } from 'lucide-react';
import { usePlayerStore } from '../states';
interface playButtonProps {
  trackUri: string;
}
const PlayButton = ({ trackUri }: playButtonProps) => {
  console.log(trackUri);
  const { setUris } = usePlayerStore();
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
