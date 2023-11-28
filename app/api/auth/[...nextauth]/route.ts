import { spotifyBaseUrl } from '@/lib/types';
import { initAdmin } from '@/lib/utils/firebase';
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: String(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID),
      clientSecret: String(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET),
      // You can customize additional options here, if needed
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email user-library-read user-modify-playback-state streaming user-read-currently-playing user-read-playback-state user-read-private playlist-modify-public playlist-modify-private',
    }),
  ],
  pages: {
    signIn: '/signIn',
  },
  secret: String(process.env.NEXTAUTH_SECRET),
  callbacks: {
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;
        return token;
      }
      // Access token has not expired
      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires * 10
      ) {
        return token;
      }

      // Access token has expired, refresh it
      return await refreshAccessToken(token);
    },
    async session({ session, token, user }: any) {
      // Send properties to the client

      session.accessToken = token.accessToken;

      // Query users spotify profile
      var spotifyResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      const spotifyUserProfile = await spotifyResponse.json();
      console.log(spotifyUserProfile);
      // Add custom logic to link Spotify authentication with Firebase
      if (session.user) {
        try {
          const adminApp = await initAdmin();
          const adminAuth = adminApp.auth();
          // Assuming 'firebase' is your Firebase Admin SDK instance
          const user = await adminAuth.getUserByEmail(session.user.email);

          // Merge the NextAuth user and Firebase user data
          if (user) {
            session.user = {
              ...user,
              id: spotifyUserProfile.id,
              image: spotifyUserProfile.images[0],
              uri: spotifyUserProfile.uri,
              product: spotifyUserProfile.product,
              firebaseUserId: user.uid,
            };
          } else {
            const newUser = await adminAuth.createUser({
              email: session.user.email,
              displayName: session.displayName.name,
            });
            session.user = {
              ...newUser,

              firebaseUserId: newUser.uid,
            };
          }
        } catch (error: any) {
          if (error.code === 'auth/user-not-found') {
            const adminApp = await initAdmin();
            const adminAuth = adminApp.auth();
            // Handle the case when the user is not found in Firebase
            // Create a new Firebase user here if needed
            // ...

            // For example:
            const newUser = await adminAuth.createUser({
              email: session.user.email,
              displayName: session.user.name,

              // Add other necessary data
            });

            session.user = {
              ...user,
              context: null,
              status: false,
              genres: null,

              firebaseUserId: newUser.uid,
              // Add other necessary data
            };
          } else {
            // Handle other errors
            console.error('Error fetching user from Firebase:', error);
          }
        }
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

async function refreshAccessToken(token: any) {
  // Implement your logic to refresh the Spotify access token
  // This function should return an updated token object
  // ...
  const url = 'https://accounts.spotify.com/api/token';
  const authString = Buffer.from(
    `${String(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID)}:${String(
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
    )}`
  ).toString('base64');
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      authorization: `Basic ${authString}`,
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    }),
  };

  const body = await fetch(url, payload);
  const response = await body.json();
  if (response) {
    console.log(response);
    const { access_token, token_type, expires_in, scope } = response;
    token.accessToken = access_token;
    token.accessTokenExpires = expires_in;
    return token;
  }
}
