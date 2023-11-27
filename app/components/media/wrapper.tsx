import React, { ReactNode } from 'react';
import MediaCard from './card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChevronRight, InfoIcon } from 'lucide-react';
import Link from 'next/link';

interface MediaWrapperProps {
  type:
    | 'track'
    | 'album-spotify'
    | 'artists-albums-spotify'
    | 'playlist-generated'
    | 'playlist-user'
    | 'playlist'
    | 'playlist-spotify';
  redirect?: string;
  information?: string;
  title: string;
  media:
    | {
        tracks: SpotifyApi.TrackSearchResponse[];
        playlistName: string;
        playlistCover: string;
      }[]
    | SpotifyApi.ListOfFeaturedPlaylistsResponse
    | SpotifyApi.ListOfNewReleasesResponse
    | SpotifyApi.ListOfCurrentUsersPlaylistsResponse
    | SpotifyApi.TrackSearchResponse[]
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.ArtistsAlbumsResponse
    | null;
  overflow: boolean;
}

const MediaWrapper = ({
  type,
  redirect,
  information,
  title,
  media,
  overflow,
}: MediaWrapperProps) => {
  return (
    <div className='space-y-4 text-my-dark-gray'>
      <span className='flex gap-2'>
        {information && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InfoIcon />
              </TooltipTrigger>
              <TooltipContent className='w-[200px]'>
                {information}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {!redirect ? (
          <h3 className='text-[18px]'>{title}</h3>
        ) : (
          <Link
            href={redirect}
            className='flex w-fit items-center gap-2 text-[18px]'
          >
            {title} <ChevronRight className='text-my-mid-gray' />
          </Link>
        )}
      </span>
      <MediaCard media={media} type={type} overflow={overflow} />
    </div>
  );
};

export default MediaWrapper;
