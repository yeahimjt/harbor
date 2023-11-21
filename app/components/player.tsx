import { useSession } from 'next-auth/react';
import React from 'react';
import SpotifyWebPlayer, { SpotifyPlayer } from 'react-spotify-web-playback';
interface playerProps {
  access_token: string;
  track_uri: string;
}
const Player = ({ access_token, track_uri }: playerProps) => {
  console.log(access_token);
  // const { data: session } = useSession();
  // if (session?.user.product === 'free') {
  //   return
  // }
  return <SpotifyWebPlayer token={access_token} uris={track_uri} />;
};

export default Player;
