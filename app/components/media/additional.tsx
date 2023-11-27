import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Clock } from 'lucide-react';
import Link from 'next/link';
import MediaWrapper from './wrapper';
import { MediaAdditionalProps } from '@/lib/types';

function msToMinSec(milliseconds: number) {
  var totalSeconds = Math.floor(milliseconds / 1000);
  var minutes = Math.floor(totalSeconds / 60);
  var seconds = totalSeconds % 60;

  // Add leading zero if seconds is a single digit
  var formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

  return minutes + ':' + formattedSeconds;
}

const MediaAdditional = ({
  type,
  media,
  spotify_data,
}: MediaAdditionalProps) => {
  if (type === 'track') {
  } else if (type === 'artist-album-spotify') {
    const albumData = media as SpotifyApi.AlbumObjectFull;

    return (
      <>
        <Table>
          <TableHeader className=''>
            <TableRow className=''>
              <TableHead className='w-[100px]'>#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className='flex justify-end text-right'>
                <Clock className='relative right-0 ' />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {albumData.tracks.items.map((songs, index) => (
              <TableRow key={songs.id}>
                <TableCell className='font-medium'>{index + 1}</TableCell>
                <TableCell className='hover:underline'>
                  <Link href={`/dashboard/songs/${songs.id}`}>
                    {songs.name}
                  </Link>
                </TableCell>
                <TableCell className='flex justify-end'>
                  {msToMinSec(songs.duration_ms)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {spotify_data && (
          <MediaWrapper
            title={`More from ${albumData.artists[0].name}`}
            type={'artists-albums-spotify'}
            media={spotify_data}
            overflow={false}
          />
        )}
      </>
    );
  } else if (type === 'playlist') {
    const playlistData = media as SpotifyApi.PlaylistObjectFull;
    return (
      <Table>
        <TableHeader className=''>
          <TableRow className=''>
            <TableHead className='w-[100px]'>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Album</TableHead>
            <TableHead className='flex justify-end text-right'>
              <Clock className='relative right-0 ' />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playlistData.tracks.items.map((songs, index) => (
            <TableRow key={songs.track?.id}>
              <TableCell className='font-medium'>{index + 1}</TableCell>
              <TableCell className='hover:underline'>
                <Link href={`/dashboard/songs/${songs.track?.id}`}>
                  {songs.track?.name}
                </Link>
              </TableCell>
              <TableCell className='hover:underline'>
                <Link href={`/dashboard/albums/${songs.track?.album.id}`}>
                  {songs.track?.album.name}
                </Link>
              </TableCell>
              <TableCell className='flex justify-end'>
                {msToMinSec(songs.track!.duration_ms)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  } else if (type === 'playlist-generated') {
    const playlistData = media as {
      tracks: SpotifyApi.TrackSearchResponse[];
      playlistName: string;
      playlistCover: string;
    };

    return (
      <Table>
        <TableHeader className=''>
          <TableRow className=''>
            <TableHead className='w-[100px]'>#</TableHead>
            <TableHead>Artist</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Album</TableHead>
            <TableHead className='flex justify-end text-right'>
              <Clock className='relative right-0 ' />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playlistData.tracks.map((songs, index) => (
            <TableRow key={songs.tracks.items[0].id}>
              <TableCell className='font-medium'>{index + 1}</TableCell>
              <TableCell className='text-my-dark-gray'>
                {songs.tracks.items[0].artists[0].name}
              </TableCell>
              <TableCell className='hover:underline'>
                <Link href={`/dashboard/songs/${songs.tracks.items[0].id}`}>
                  {songs.tracks.items[0].name}
                </Link>
              </TableCell>
              <TableCell className='hover:underline'>
                <Link
                  href={`/dashboard/albums/${songs.tracks.items[0].album.id}`}
                >
                  {songs.tracks.items[0].album.name}
                </Link>
              </TableCell>
              <TableCell className='flex justify-end'>
                {msToMinSec(songs.tracks.items[0].duration_ms)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
  return <div>MediaAdditional</div>;
};

export default MediaAdditional;
