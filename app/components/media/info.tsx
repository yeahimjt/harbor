'use client';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
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
import { MoreVertical, ThumbsDown, ThumbsUp, XIcon } from 'lucide-react';
import { addToLiked } from '@/lib/utils/index';
import { removeLiked } from '@/lib/utils/index';

interface MediaInfoProps {
  type: 'album' | 'track' | 'playlist' | 'playlist-generated';
  media:
    | {
        playlistName: string;
        playlistCover: string;
        tracks: { tracks: SpotifyApi.TrackSearchResponse }[];
      }
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.AlbumObjectFull
    | SpotifyApi.PlaylistObjectFull;
  liked?: boolean | null;
  handleLiked?: () => void;
}

const MediaInfo = ({ type, media, liked, handleLiked }: MediaInfoProps) => {
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
                    {!liked ? (
                      <DropdownMenuItem
                        className='flex cursor-pointer gap-2'
                        onClick={() => handleLiked!()}
                      >
                        <ThumbsUp />
                        Suggest More Like This
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        className='flex cursor-pointer gap-2'
                        onClick={() => handleLiked!()}
                      >
                        <XIcon />
                        Remove from likes
                      </DropdownMenuItem>
                    )}
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
  } else if (type === 'playlist') {
    const playlistData = media as SpotifyApi.PlaylistObjectFull;

    return (
      <section className='flex  gap-4 '>
        <Image
          src={playlistData.images[0].url || ''}
          alt={playlistData.name || 'song image'}
          width={300}
          height={300}
        />
        <section className='flex w-full flex-col justify-between '>
          <div>
            <div className='flex  items-center justify-between'>
              <h2>{playlistData.type}</h2>
            </div>
            <h1>{playlistData.name}</h1>
          </div>
          <div className='flex items-center justify-between '>
            <div></div>
            <PlayButton
              size={40}
              trackUri={playlistData.uri}
              redirect={playlistData.external_urls.spotify}
            />
          </div>
        </section>
      </section>
    );
  } else if (type === 'playlist-generated') {
    const playlistData = media as {
      playlistName: string;
      playlistCover: string;
      tracks: { tracks: SpotifyApi.TrackSearchResponse }[];
    };
    return (
      <section className='flex  gap-4 '>
        <Image
          src={playlistData.playlistCover || ''}
          alt={playlistData.playlistName || 'song image'}
          width={300}
          height={300}
        />
        <section className='flex w-full flex-col justify-between '>
          <div>
            <div className='flex  items-center justify-between'>
              <h2>playlist generated</h2>
            </div>
            <h1>{playlistData.playlistName}</h1>
          </div>
          <div className='flex items-center justify-between '>
            <div></div>
            {/* <PlayButton
              size={40}
              trackUri={playlistData.uri}
              redirect={playlistData.external_urls.spotify}
            /> */}
          </div>
        </section>
      </section>
    );
  }
  return <div>unvalid type</div>;
};

export default MediaInfo;
