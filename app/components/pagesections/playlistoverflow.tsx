import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Image from 'next/image';
import React from 'react';

interface ContentState {
  playlists: {
    tracks: SpotifyApi.TrackSearchResponse[];
    playlistName: string;
    playlistCover: string;
  }[];
}

const PlaylistOverflow = ({ playlists }: ContentState) => {
  return (
    <ScrollArea>
      <section className='flex  w-full gap-8  '>
        {playlists ? (
          playlists.map(
            (
              playlist: {
                tracks: SpotifyApi.TrackSearchResponse[];
                playlistName: string;
                playlistCover: string;
              },
              index: number
            ) => (
              <section className='h-[380px] w-[250px] space-y-2' key={index}>
                <div className='img-hover-zoom cursor-pointer flex-wrap lg:flex-nowrap'>
                  <Image
                    className='min-w-[250px]'
                    src={playlist.playlistCover}
                    height={300}
                    width={300}
                    alt=''
                  />
                </div>
                <h2 className='h-[24px] truncate'>{playlist.playlistName}</h2>
              </section>
            )
          )
        ) : (
          <div className='h-[322px]'></div>
        )}
        <div className='min-w-[250px]'></div>
      </section>
      <ScrollBar orientation='horizontal' />
    </ScrollArea>
  );
};

export default PlaylistOverflow;
