import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import AuthProvider from './context/AuthProvider';
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Harbor',
  description:
    'Generate spotify playlists using direct context, i.e. genres you enjoy, music you generally like listening to.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${roboto.className} `}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
