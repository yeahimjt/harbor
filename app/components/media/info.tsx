import React from 'react';
import PlayButton from '../play';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreVertical, ThumbsDown, ThumbsUp } from 'lucide-react';

interface MediaInfoProps {
  type: 'album' | 'track' | 'playlist';
  media:
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.AlbumObjectFull
    | SpotifyApi.PlaylistObjectFull;
}

const MediaInfo = ({ type, media }: MediaInfoProps) => {
  if (type === 'track') {
    const songData = media as SpotifyApi.TrackObjectFull;
    return (
      <section className='flex gap-4'>
        <Image
          src={songData.album.images[0].url || ''}
          alt={songData.name || 'song image'}
          width={300}
          height={300}
        />
        <section className='flex w-full flex-col justify-between'>
          <div>
            <div className='flex items-center justify-between'>
              <h2>{songData.type}</h2>
              <DropdownMenu>
                <DropdownMenuTrigger className='cursor-pointer' asChild>
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mr-4'>
                  <DropdownMenuGroup>
                    <DropdownMenuItem className='flex cursor-pointer gap-2'>
                      <ThumbsUp />
                      Suggest More Like This
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='flex cursor-pointer gap-2'>
                      <ThumbsDown />
                      Suggest Less Like This
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h1>{songData.name}</h1>
            <a
              className='mb-8 underline underline-offset-2'
              href={`/dashboard/albums/${songData.album.id}`}
            >
              {songData.album.name}
            </a>

            <span className='mt-4 flex gap-2'>
              {songData.artists.map((artist, index) => (
                <a
                  href={artist.external_urls.spotify}
                  target='_blank'
                  rel='noreferrer'
                  className='bg-transparent  text-[14px] text-black'
                  key={index}
                >
                  {`${artist.name} ${
                    index < songData.artists.length - 1 ? `-` : ''
                  }`}
                </a>
              ))}
            </span>
          </div>
          <div className='flex items-center justify-between '>
            <div></div>
            <PlayButton
              size={40}
              trackUri={songData.uri}
              redirect={songData.external_urls.spotify}
            />
          </div>
        </section>
      </section>
    );
  } else if (type === 'album') {
    const albumData = media as SpotifyApi.AlbumObjectFull;

    return (
      <section className='flex  gap-4 '>
        <Image
          src={albumData.images[0].url || ''}
          alt={albumData.name || 'song image'}
          width={300}
          height={300}
        />
        <section className='flex w-full flex-col justify-between '>
          <div>
            <div className='flex  items-center justify-between'>
              <h2>{albumData.type}</h2>
              <DropdownMenu>
                <DropdownMenuTrigger className='cursor-pointer' asChild>
                  <MoreVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent className='mr-4'>
                  <DropdownMenuGroup>
                    <DropdownMenuItem className='flex cursor-pointer gap-2'>
                      <ThumbsUp />
                      Suggest More Like This
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className='flex cursor-pointer gap-2'>
                      <ThumbsDown />
                      Suggest Less Like This
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h1>{albumData.name}</h1>
            <a
              className='mb-8 underline underline-offset-2'
              href={`/dashboard/albums/${albumData.id}`}
            >
              {albumData.name}
            </a>

            <span className='mt-4 flex gap-2'>
              {albumData.artists.map((artist, index) => (
                <a
                  href={artist.external_urls.spotify}
                  target='_blank'
                  rel='noreferrer'
                  className='bg-transparent  text-[14px] text-black'
                  key={index}
                >
                  {`${artist.name} ${
                    index < albumData.artists.length - 1 ? `-` : ''
                  }`}
                </a>
              ))}
            </span>
          </div>
          <div className='flex items-center justify-between '>
            <div></div>
            <PlayButton
              size={40}
              trackUri={albumData.uri}
              redirect={albumData.external_urls.spotify}
            />
          </div>
        </section>
      </section>
    );
  }
  return <div>MediaInfo</div>;
};

export default MediaInfo;
