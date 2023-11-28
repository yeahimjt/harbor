import NextAuth, { NextAuthOptions } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    context: string | null;
    genres: string[] | null;
    uid: string;
    firebaseUserId: string;

    user: {
      uid: string;
      firebaseUserId: string;
      displayName: string;
      email: string;
      image: {
        url: string;
        width: number;
        height: number;
      };
      id: string;
      product: string;
    };
    // Add any other properties you may need
  }
}

export default NextAuthOptions;
