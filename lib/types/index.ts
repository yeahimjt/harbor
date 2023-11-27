// Types related to re-usable media components
type MediaUsageType =
  | 'track'
  | 'album'
  | 'album-spotify'
  | 'artists-albums-spotify'
  | 'track'
  | 'playlist'
  | 'playlist-spotify'
  | 'playlist-user'
  | 'playlist-generated';

type MediaIsType =
  | {
      tracks: SpotifyApi.TrackSearchResponse[];
      playlistName: string;
      playlistCover: string;
    }[]
  | SpotifyApi.ListOfFeaturedPlaylistsResponse
  | SpotifyApi.ListOfNewReleasesResponse
  | SpotifyApi.TrackSearchResponse[]
  | SpotifyApi.TrackObjectFull
  | SpotifyApi.ListOfFeaturedPlaylistsResponse
  | SpotifyApi.ArtistsAlbumsResponse
  | SpotifyApi.ListOfCurrentUsersPlaylistsResponse
  | null;

export interface MediaCardProps {
  type: MediaUsageType;
  media: MediaIsType;
  overflow: boolean;
}

export interface MediaAdditionalProps {
  type:
    | 'album'
    | 'artist-album-spotify'
    | 'track'
    | 'playlist'
    | 'playlist-generated';
  media:
    | {
        tracks: SpotifyApi.TrackSearchResponse[];
        playlistName: string;
        playlistCover: string;
      }
    | SpotifyApi.TrackObjectFull
    | SpotifyApi.AlbumObjectFull
    | SpotifyApi.PlaylistObjectFull;
  spotify_data?: SpotifyApi.ArtistsAlbumsResponse;
}

export const genres = [
  { value: 'rock', title: 'Rock', clicked: false },
  { value: 'pop', title: 'Pop', clicked: false },
  { value: 'hip-hop', title: 'Hip-Hop / Rap', clicked: false },
  { value: 'electronic', title: 'Electronic', clicked: false },
  { value: 'jazz', title: 'Jazz', clicked: false },
  { value: 'blues', title: 'Blues', clicked: false },
  { value: 'country', title: 'Country', clicked: false },
  { value: 'r&b', title: 'R&B', clicked: false },
  { value: 'reggae', title: 'Reggae', clicked: false },
  { value: 'classical', title: 'Classical', clicked: false },
  { value: 'gospel', title: 'Gosepl', clicked: false },
  { value: 'experimental', title: 'Experimental', clicked: false },
];

export interface UserCustom {
  custom: string;
  genres: string[];
  setup: boolean;
}

export interface CustomUser {
  context: string | null;
  displayName: string;
  email: string;
  genres: string[];
  photoURL: string | null;
  setup: boolean;
  uid: string;
}

// Api related constants

export const spotifyBaseUrl = 'https://api.spotify.com/v1/';
