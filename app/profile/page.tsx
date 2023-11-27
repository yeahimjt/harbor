'use client';
import React, { useEffect, useState } from 'react';
import DashNav from '../components/dashnav';
import { User, signOut } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { Input } from '@/components/ui/input';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Textarea } from '@/components/ui/textarea';
import { grabUserInfo, initializeRecommendations } from '@/lib/utils/index';
import { DocumentData, doc, updateDoc } from 'firebase/firestore';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CustomUser, UserCustom, genres } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Page = () => {
  const [loading, setLoading] = useState<boolean | null>(null);

  // Use user from local session
  const { data: session } = useSession();
  const genresInitialState = genres;
  const [userInfo, setUserInfo] = useState<CustomUser | null>(null);
  const [usersGenres, setUsersGenres] = useState(genresInitialState);
  useEffect(() => {
    async function getUserInfo() {
      const userGrabbed = await grabUserInfo(session!.user.uid);
      if (userGrabbed) {
        const genresUsersClicked = genres.map((genre) => ({
          ...genre,
          clicked: userGrabbed.genres.includes(genre.value),
        }));
        setUsersGenres(genresUsersClicked);
        setUserInfo(userGrabbed);
      }
    }
    if (session) {
      getUserInfo();
    }
  }, [session]);
  const removeGenre = (targetGenre: string) => {
    const updatedGenres = usersGenres.map((genre) =>
      genre.value === targetGenre ? { ...genre, clicked: false } : genre
    );
    setUsersGenres(updatedGenres);
    setUserInfo((prevUserInfo) => {
      if (prevUserInfo) {
        return {
          ...prevUserInfo,
          genres: prevUserInfo.genres.filter(
            (gen: string) => gen !== targetGenre
          ),
        };
      }
      return null;
    });
  };

  const addGenre = (targetGenre: string) => {
    console.log(' in here');
    const updatedGenres = usersGenres.map((genre) =>
      genre.value === targetGenre ? { ...genre, clicked: true } : genre
    );
    setUsersGenres(updatedGenres);
    setUserInfo((prevUserInfo) => {
      if (prevUserInfo) {
        return {
          ...prevUserInfo,
          genres: [...prevUserInfo.genres, targetGenre],
        };
      }
      return null;
    });
    console.log(usersGenres);
  };
  console.log(userInfo);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!session || !userInfo) {
      return;
    }
    const userDocRef = doc(firestore, 'users', session.user.uid);
    setLoading(true);
    const updatedUser = await updateDoc(userDocRef, {
      genres: userInfo.genres || null,
      context: userInfo.context ? userInfo!.context : null,
      displayName: userInfo.displayName || session!.user!.displayName,
      email: userInfo.email || session!.user!.email,
    });
    // await initializeRecommendations(userInfo, session!.accessToken);
    setLoading(false);
  };
  console.log(loading);
  return (
    <div className='page-container'>
      <DashNav />
      {session?.user && userInfo && (
        <section className='page-section'>
          <div className='space-y-8 text-my-black'>
            <span>
              <h1 className='text-[18px]'>Profile</h1>
              <p>
                This information will be used to tailor your experience uniquely
                to you.
              </p>
            </span>
            <hr />
            <Image
              className='rounded-full'
              src={session.user.image.url}
              width={session.user.image.width}
              height={session.user.image.height}
              alt=''
            />
            <h2>Spotify Subscription Tier: {session.user.product}</h2>
            <form className='space-y-10'>
              <section className='space-y-2'>
                <label>Display Name</label>
                <Input
                  placeholder={session.user?.displayName || ''}
                  onChange={(e) =>
                    setUserInfo((prevUserInfo) => {
                      if (prevUserInfo) {
                        return {
                          ...prevUserInfo,
                          displayName: e.target.value,
                        };
                      } else {
                        return {
                          context: '',
                          customClaims: {},
                          disabled: false,
                          displayName: e.target.value,
                          email: '',
                          emailVerified: false,
                          genres: [],
                          metadata: { creationTime: '', lastSignInTime: '' },
                          passwordHash: null,
                          passwordSalt: null,
                          phoneNumber: null,
                          photoURL: '',
                          providerData: [],
                          setup: false,
                          tokensValidAfterTime: null,
                          uid: '',
                        };
                      }
                    })
                  }
                />
                <p>This is your name that you will be referenced as.</p>
              </section>
              <section className='space-y-2'>
                <label>Email Address</label>
                <Input
                  placeholder={session.user.email || ''}
                  type='email'
                  onChange={(e) =>
                    setUserInfo((prevUserInfo) => {
                      if (prevUserInfo) {
                        return {
                          ...prevUserInfo,
                          email: e.target.value,
                        };
                      } else {
                        return {
                          context: '',
                          customClaims: {},
                          disabled: false,
                          displayName: '',
                          email: e.target.value,
                          emailVerified: false,
                          genres: [],
                          metadata: { creationTime: '', lastSignInTime: '' },
                          passwordHash: null,
                          passwordSalt: null,
                          phoneNumber: null,
                          photoURL: '',
                          providerData: [],
                          setup: false,
                          tokensValidAfterTime: null,
                          uid: '',
                        };
                      }
                    })
                  }
                />
                <p>
                  You can optionally update the email address linked to this
                  account.
                </p>
              </section>
              <section className='space-y-2'>
                <label>Genres You Enjoy</label>
                <section className='flex flex-wrap gap-[10px]'>
                  {usersGenres.map((genre, index) => (
                    <Button
                      type='button'
                      className={
                        genre.clicked
                          ? 'border bg-slate-200 text-black hover:bg-white hover:text-black'
                          : 'border bg-white text-my-black hover:bg-slate-200'
                      }
                      key={index}
                      value={genre.value}
                      onClick={() =>
                        genre.clicked
                          ? removeGenre(genre.value)
                          : addGenre(genre.value)
                      }
                    >
                      {genre.title}
                    </Button>
                  ))}
                </section>

                <p>
                  Only music of these genres will appear on your feed. If you
                  don&apos;t have a preference between any of these genres they
                  will be randomly generated for you.
                </p>
              </section>
              <section className='space-y-2'>
                <label>Context</label>
                <Textarea
                  placeholder={userInfo?.context || ''}
                  onChange={(e) =>
                    setUserInfo((prevUserInfo) => {
                      if (prevUserInfo) {
                        return {
                          ...prevUserInfo,
                          context: e.target.value,
                        };
                      } else {
                        return {
                          context: e.target.value,
                          customClaims: {},
                          disabled: false,
                          displayName: '',
                          email: '',
                          emailVerified: false,
                          genres: [],
                          metadata: { creationTime: '', lastSignInTime: '' },
                          passwordHash: null,
                          passwordSalt: null,
                          phoneNumber: null,
                          photoURL: '',
                          providerData: [],
                          setup: false,
                          tokensValidAfterTime: null,
                          uid: '',
                        };
                      }
                    })
                  }
                />
                <p>
                  Providing context related to what you typically listen to will
                  improve accuracy to general recommendations.
                </p>
              </section>
              <Button
                type='submit'
                className='bg-blue-cta hover:bg-blue-highlight'
                onClick={(e) => handleSubmit(e)}
                disabled={loading ? true : false}
              >
                {loading ? 'Updating...' : 'Update'}
              </Button>
            </form>
          </div>
          <div className=''>
            <button
              className='rounded-[5px] bg-error px-4 py-2 text-white shadow-md'
              onClick={() => signOut(auth)}
            >
              Sign Out
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Page;
