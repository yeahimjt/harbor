import React from 'react';
import ListenNow from './songoverflow';
import MadeForYou from './playlistoverflow';

interface ContentState {
  songs: SpotifyApi.TrackSearchResponse[];
  playlists: {
    tracks: SpotifyApi.TrackSearchResponse[];
    playlistName: string;
    playlistCover: string;
  }[];
}

interface pageSectionProps {
  type: string;
  title: string;
  subtitle: string;
  content?: ContentState;
}

const PageSection = ({ type, title, subtitle, content }: pageSectionProps) => {
  return (
    <>
      <section className='space-y-4'>
        <span className='space-y-0'>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </span>
        <hr className='' />
        {content ? (
          type === 'listen_now' ? (
            <ListenNow songs={content!.songs} />
          ) : type === 'made_for_you' ? (
            <MadeForYou playlists={content!.playlists} />
          ) : (
            ''
          )
        ) : (
          <section className='h-[333px]'></section>
        )}
      </section>
    </>
  );
};

export default PageSection;
