'use client';
import React, { useEffect, useState } from 'react';
import DashNav from '../components/dashnav';
import { useSession } from 'next-auth/react';
import { grabUserListenNow } from '@/lib/utils/index';
import Image from 'next/image';
import PlayButton from '../components/play';
import Player from '../components/player';
import { usePlayerStore } from '../states';

const loaderProp = (src: string) => {
  return src;
};

interface ListenNowState {
  songs: SpotifyApi.TrackSearchResponse[];
  playlists: {
    tracks: SpotifyApi.TrackSearchResponse[];
    playlistName: string;
    playlistCover: string;
  }[];
}

const Content = () => {
  const { data: session } = useSession();
  const { uris } = usePlayerStore();

  const [listenNow, setListenNow] = useState<ListenNowState | null>(null);
  useEffect(() => {
    async function handleGrabUaserListenNow() {
      const data = await grabUserListenNow(session!.user.uid);
      if (!data) {
        return;
      }
      setListenNow(data);
    }
    if (session) {
      handleGrabUaserListenNow();
    }
  }, [session]);
  console.log(listenNow);
  return (
    <div className='page-container overflow-x-hidden'>
      <DashNav />
      <section>
        <div className='page-section'>
          <section className='space-y-4'>
            <span className='space-y-1'>
              <h1>Listen Now</h1>
              <p>Top picks for you.</p>
            </span>
            <hr className='' />
            <section className='flex  gap-8 overflow-x-auto '>
              {listenNow ? (
                listenNow.songs.map(
                  (song: SpotifyApi.TrackSearchResponse, index: number) => (
                    <section
                      className='h-[380px] w-[250px] space-y-2'
                      key={index}
                    >
                      <div className='img-hover-zoom cursor-pointer flex-wrap lg:flex-nowrap'>
                        <Image
                          className='min-w-[250px]'
                          src={song.tracks.items[0].album.images[0].url}
                          height={300}
                          width={300}
                          alt=''
                        />
                      </div>
                      <h2 className='h-[24px] truncate'>
                        {song.tracks.items[0].name}
                      </h2>
                      <span>
                        <p>{song.tracks.items[0].artists[0].name}</p>
                      </span>
                      <PlayButton trackUri={song.tracks.items[0].uri} />
                    </section>
                  )
                )
              ) : (
                <div className='h-[322px]'></div>
              )}
              <div className='min-w-[250px]'></div>
            </section>
          </section>
          <section className='space-y-4'>
            <span className='space-y-1'>
              <h1>Made For You</h1>
              <p>Your personal playlists.</p>
            </span>
            <hr className='' />
            <section className='flex  gap-8 overflow-x-auto '>
              {listenNow?.playlists.map(
                (
                  playlist: {
                    tracks: SpotifyApi.TrackSearchResponse[];
                    playlistName: string;
                    playlistCover: string;
                  },
                  index: number
                ) => (
                  <section className='space-y-2' key={index}>
                    <div className='img-hover-zoom cursor-pointer flex-wrap lg:flex-nowrap'>
                      {playlist.playlistCover ? (
                        <Image
                          className='min-w-[250px]'
                          src={playlist.playlistCover}
                          height={300}
                          width={300}
                          alt=''
                        />
                      ) : (
                        <div className='h-[300px] w-[300px]'></div>
                      )}
                    </div>
                    <h2>{playlist.playlistName}</h2>
                    <span>
                      {/* <p>{song.tracks.items[0].artists[0].name}</p> */}
                    </span>
                  </section>
                )
              )}
              <div className='min-w-[250px]'></div>
            </section>
          </section>
        </div>
        {uris && (
          <Player access_token={session!.accessToken} track_uri={uris} />
        )}
      </section>
    </div>
  );
};

export default Content;
