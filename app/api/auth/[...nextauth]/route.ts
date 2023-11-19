import { initAdmin } from '@/lib/utils/firebase';
import NextAuth, { AuthOptions } from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';

const authOptions: AuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: String(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID),
      clientSecret: String(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET),
      // You can customize additional options here, if needed
    }),
  ],
  secret: process.env.JWT_SECRET,

  callbacks: {
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin
      console.log(account, 'this is th eaccount');
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
      // Send properties to the client, like an access_token from a provider
      // return session;
      session.accessToken = token.accessToken;
      console.log('inside session: ', session.accessToken);
      console.log(user);
      // Add custom logic to link Spotify authentication with Firebase
      if (session.user) {
        try {
          const adminApp = await initAdmin();
          const adminAuth = adminApp.auth();
          // Assuming 'firebase' is your Firebase Admin SDK instance
          const user = await adminAuth.getUserByEmail(session.user.email);
          console.log('user is: ', user);
          // Merge the NextAuth user and Firebase user data
          if (user) {
            session.user = {
              ...user,
              firebaseUserId: user.uid,
              // Add other necessary data
            };
          } else {
            console.log('creating new user:');
            const newUser = await adminAuth.createUser({
              email: session.user.email,
              displayName: session.displayName.name,
              // Add other necessary data
            });
            session.user = {
              ...newUser,

              firebaseUserId: newUser.uid,
              // Add other necessary data
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
};
const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: String(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID),
      clientSecret: String(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET),
      // You can customize additional options here, if needed
    }),
  ],
  secret: String(process.env.NEXTAUTH_SECRET),

  callbacks: {
    async jwt({ token, account }: any) {
      // Persist the OAuth access_token to the token right after signin
      console.log(account, 'this is th eaccount');
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
      // Send properties to the client, like an access_token from a provider
      // return session;
      session.accessToken = token.accessToken;
      console.log('inside session: ', session.accessToken);
      console.log(user);
      // Add custom logic to link Spotify authentication with Firebase
      if (session.user) {
        try {
          const adminApp = await initAdmin();
          const adminAuth = adminApp.auth();
          // Assuming 'firebase' is your Firebase Admin SDK instance
          const user = await adminAuth.getUserByEmail(session.user.email);
          console.log('user is: ', user);
          // Merge the NextAuth user and Firebase user data
          if (user) {
            session.user = {
              ...user,
              firebaseUserId: user.uid,
              // Add other necessary data
            };
          } else {
            console.log('creating new user:');
            const newUser = await adminAuth.createUser({
              email: session.user.email,
              displayName: session.displayName.name,
              // Add other necessary data
            });
            session.user = {
              ...newUser,

              firebaseUserId: newUser.uid,
              // Add other necessary data
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
  console.log(token);
  const url = 'https://accounts.spotify.com/api/token';
  const authString = Buffer.from(
    `${String(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID)}:${String(
      process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
    )}`
  ).toString('base64');
  console.log(token);
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
  console.log('this is my response', response);
  if (response) {
    const { access_token, token_type, expires_in, scope } = response;
    token.accessToken = access_token;
    token.accessTokenExpires = expires_in;
    return token;
  }
}
