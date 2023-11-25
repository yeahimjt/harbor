import React from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Clock } from 'lucide-react';
import Link from 'next/link';

interface MediaAdditionalProps {
  type: 'album' | 'track' | 'playlist';
  media:
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.AlbumObjectFull
    | SpotifyApi.PlaylistObjectFull;
}

const MediaAdditional = ({ type, media }: MediaAdditionalProps) => {
  if (type === 'track') {
  } else if (type === 'album') {
    const albumData = media as SpotifyApi.AlbumObjectFull;
    return (
      <Table>
        <TableHeader className=''>
          <TableRow className=''>
            <TableHead className='w-[100px]'>#</TableHead>
            <TableHead>Title</TableHead>
            <TableHead className='flex justify-end text-right'>
              <Clock className='relative right-0 ' />
            </TableHead>
            {/* <TableHead className='text-right'></TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {albumData.tracks.items.map((songs, index) => (
            <TableRow key={songs.id}>
              <TableCell className='font-medium'>{index + 1}</TableCell>
              <TableCell className='hover:underline'>
                <Link href={`/dashboard/songs/${songs.id}`}>{songs.name}</Link>
              </TableCell>
              <TableCell className='flex justify-end'>
                {songs.duration_ms}
              </TableCell>
              {/* <TableCell className='text-right'></TableCell> */}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className='text-right'></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
  return <div>MediaAdditional</div>;
};

export default MediaAdditional;
