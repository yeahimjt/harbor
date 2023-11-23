import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Image from 'next/image';
import React from 'react';
import PlayButton from '../play';
import { redirect } from 'next/navigation';
import Link from 'next/link';

interface ContentState {
  songs: SpotifyApi.TrackSearchResponse[];
}

const SongOverflow = ({ songs }: ContentState) => {
  return (
    <ScrollArea>
      <section className='flex  w-full gap-8  '>
        {songs ? (
          songs.map((song: SpotifyApi.TrackSearchResponse, index: number) => (
            <section className='h-[380px] w-[250px] space-y-2' key={index}>
              <div className='img-hover-zoom cursor-pointer flex-wrap lg:flex-nowrap'>
                <Link href={`/dashboard/songs/${song.tracks.items[0].id}`}>
                  <Image
                    className='min-w-[250px]'
                    src={song.tracks.items[0].album.images[0].url}
                    height={300}
                    width={300}
                    alt=''
                  />
                </Link>
              </div>
              <h2 className='h-[24px] truncate'>{song.tracks.items[0].name}</h2>
              <span>
                <h3 className='text-[14px]'>
                  {song.tracks.items[0].artists[0].name}
                </h3>
              </span>
              <PlayButton
                size={20}
                redirect={song.tracks.items[0].external_urls.spotify}
                trackUri={song.tracks.items[0].uri}
              />
            </section>
          ))
        ) : (
          <div className='h-[322px]'></div>
        )}
        <div className='min-w-[250px]'></div>
      </section>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
};

export default SongOverflow;
