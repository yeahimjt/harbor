import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { MediaCardProps } from '@/lib/types';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const MediaCard = ({ media, type, overflow }: MediaCardProps) => {
  console.log(media);
  if (type === 'track') {
    const trackData = media as SpotifyApi.TrackSearchResponse[];
    return (
      <ScrollArea className=''>
        <span
          className={`mb-4 flex gap-8 overflow-y-hidden ${
            overflow ? 'flex-nowrap' : 'flex-wrap'
          }`}
        >
          {trackData.map(
            (track: SpotifyApi.TrackSearchResponse, index: number) => (
              <section className=' media-card ' key={index}>
                <div className='img-hover-zoom '>
                  <Link href={`/dashboard/songs/${track.tracks.items[0].id}`}>
                    <Image
                      src={track.tracks.items[0].album.images[1].url}
                      width={300}
                      height={300}
                      alt={track.tracks.items[0].name}
                    />
                  </Link>
                </div>
                <div className='h-full'>
                  <h2 className='h-[24px] truncate'>
                    {track.tracks.items[0].name}
                  </h2>
                  <h3 className='text-[14px]'>
                    {track.tracks.items[0].artists[0].name}
                  </h3>
                </div>
              </section>
            )
          )}
          <div className='h-[300px] min-w-[300px]'></div>
        </span>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    );
  } else if (type === 'album-spotify') {
    const albumData = media as SpotifyApi.ListOfNewReleasesResponse;
    return (
      <section className='flex flex-wrap gap-4'>
        {albumData.albums.items.map((album, index: number) => (
          <section className='media-card ' key={index}>
            <div className='img-hover-zoom'>
              <Link href={`/dashboard/albums/${album.id}`}>
                <Image
                  className=''
                  src={album.images[0].url}
                  height={300}
                  width={300}
                  alt=''
                />
              </Link>
            </div>
            <div className='h-full'>
              <h2 className='h-[24px] truncate'>{album.name}</h2>
            </div>
          </section>
        ))}
      </section>
    );
  } else if (type === 'artists-albums-spotify') {
    const albumData = media as SpotifyApi.ArtistsAlbumsResponse;
    return (
      <section className='flex flex-wrap gap-4'>
        {albumData.items?.map((album, index: number) => (
          <section className='media-card ' key={index}>
            <div className='img-hover-zoom'>
              <Link href={`/dashboard/albums/${album.id}`}>
                <Image
                  className=''
                  src={album.images[0].url}
                  height={300}
                  width={300}
                  alt=''
                />
              </Link>
            </div>
            <div className='h-full'>
              <h2 className='h-[24px] truncate'>{album.name}</h2>
            </div>
          </section>
        ))}
      </section>
    );
  } else if (type === 'playlist-generated') {
    const playlistData = media as {
      tracks: SpotifyApi.TrackSearchResponse[];
      playlistName: string;
      playlistCover: string;
    }[];
    console.log(playlistData);
    return (
      <ScrollArea className=''>
        <span
          className={`mb-4 flex gap-8 overflow-y-hidden ${
            overflow ? 'flex-nowrap' : 'flex-wrap'
          }`}
        >
          {playlistData.map(
            ({ tracks, playlistName, playlistCover }, index: number) => (
              <section className='media-card' key={index}>
                <div className='img-hover-zoom'>
                  <Link href={`/dashboard/playlists-generated/${playlistName}`}>
                    <Image
                      className=''
                      src={`${playlistCover}`}
                      height={300}
                      width={300}
                      alt=''
                      unoptimized={true}
                      priority
                    />
                  </Link>
                </div>
                <div className='h-full'>
                  <h2 className='h-[24px] truncate'>{playlistName}</h2>
                  {/* <h3 className='text-[14px]'>{playlist.owner.name}</h3> */}
                </div>
              </section>
            )
          )}
          <div className='h-[300px] min-w-[300px]'></div>
        </span>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    );
  } else if (type === 'playlist-spotify') {
    const playlistData = media as SpotifyApi.ListOfFeaturedPlaylistsResponse;
    return (
      <ScrollArea className=''>
        <span
          className={`mb-4 flex gap-4 overflow-y-hidden ${
            overflow ? 'flex-nowrap' : 'flex-wrap'
          }`}
        >
          {playlistData.playlists.items.map((playlist, index: number) => (
            <section className='media-card' key={index}>
              <div className='img-hover-zoom'>
                <Link href={`/dashboard/playlists/${playlist.id}`}>
                  <Image
                    className=''
                    src={playlist.images[0].url}
                    height={300}
                    width={300}
                    alt=''
                  />
                </Link>
              </div>
              <div className='h-full'>
                <h2 className='h-[24px] truncate'>{playlist.name}</h2>
                {/* <h3 className='text-[14px]'>{playlist.owner.name}</h3> */}
              </div>
            </section>
          ))}
          <div className='h-[300px] min-w-[300px]'></div>
        </span>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    );
  } else if (type === 'playlist-user') {
    const playlistData =
      media as SpotifyApi.ListOfCurrentUsersPlaylistsResponse;
    return (
      <ScrollArea className=''>
        <span
          className={`mb-4 flex gap-4 overflow-y-hidden ${
            overflow ? 'flex-nowrap' : 'flex-wrap'
          }`}
        >
          {playlistData.items &&
            playlistData.items.map((playlist, index: number) => (
              <section className='media-card' key={index}>
                <div className='img-hover-zoom'>
                  <Link href={`/dashboard/playlists/${playlist.id}`}>
                    <Image
                      className=''
                      src={playlist.images[0].url}
                      height={300}
                      width={300}
                      alt=''
                    />
                  </Link>
                </div>
                <div className='h-full'>
                  <h2 className='h-[24px] truncate'>{playlist.name}</h2>
                  {/* <h3 className='text-[14px]'>{playlist.owner.name}</h3> */}
                </div>
              </section>
            ))}
          <div className='h-[300px] min-w-[300px]'></div>
        </span>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    );
  }
};

export default MediaCard;
