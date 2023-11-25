import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

interface songFlowProps {
  songs: SpotifyApi.RecommendationsObject;
}
const SongFlow = ({ songs }: songFlowProps) => {
  console.log(songs);
  return (
    <section className='flex select-none flex-wrap gap-4 '>
      {songs?.tracks.map(
        (song: SpotifyApi.RecommendationTrackObject, index: number) => (
          <section className=' media-card' key={index}>
            <div className='img-hover-zoom h-[300px] cursor-pointer flex-wrap lg:flex-nowrap '>
              <Link href={`/dashboard/songs/${song.id}`}>
                <Image
                  src={song.album.images[0].url}
                  width={300}
                  height={300}
                  alt=''
                />
              </Link>
            </div>
            <div className='h-full'>
              <h2 className='h-[24px] truncate'>{song.name}</h2>
              <h3 className='text-[14px]'>{song.artists[0].name}</h3>
            </div>
          </section>
        )
      )}
    </section>
  );
};

export default SongFlow;
