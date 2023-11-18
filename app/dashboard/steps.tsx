import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { CustomUser, genres } from '@/lib/constants';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { grabUserInfo } from '@/lib/utils/index';

interface StepsProps {
  onSubmit: (e: React.FormEvent) => void;
  setUserInfo: Dispatch<SetStateAction<CustomUser | null>>;
}

const Steps: React.FC<StepsProps> = ({ onSubmit, setUserInfo }) => {
  const genresInitialState = genres;
  const [usersGenres, setUsersGenres] = useState(genresInitialState);
  const [user] = useAuthState(auth);
  //   const [userInfo, setUserInfo] = useState<CustomUser | null>(null);

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
    // Assuming userInfo is immutable, create a new object with the updated genres
    setUserInfo((prevUserInfo) => {
      if (prevUserInfo) {
        return {
          ...prevUserInfo,
          genres: [...prevUserInfo.genres, targetGenre],
        };
      }
      return null;
    });
  };
  return (
    <div className='mx-auto flex h-screen max-w-[640px] items-center justify-center'>
      <section className='w-full space-y-8 text-my-dark-gray'>
        <span>
          <h1 className='text-[25px] font-semibold text-my-black'>
            Welcome to Harbor!
          </h1>
          <p className=''>
            Complete this quick preferences setup to start finding new music.
            This can always be changed later.
          </p>
        </span>

        <form className='space-y-8' onSubmit={(e) => onSubmit(e)}>
          <section className='space-y-2'>
            <label>Full Name</label>
            <Input
              placeholder={user?.displayName || 'Enter First and Last name'}
              onChange={(e) =>
                setUserInfo((prevUserInfo) => {
                  if (prevUserInfo) {
                    return {
                      ...prevUserInfo,
                      displayName: e.target.value,
                    };
                  } else {
                    return {
                      context: null,
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
          </section>
          <section className='space-y-2'>
            <label>
              Provide context you wish streaming services knew about you
            </label>
            <Textarea
              placeholder='When I feel like I need to boss up I usually listen to artists with a similar sound to Westside Gunn, and Conway the Machine. When I feel like I need to sit with my thoughts to relax, I enjoy hearing music that is spacey. I do not like opera music!'
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
          </section>
          <span className='flex items-center justify-center gap-[20px]'>
            <button
              className='rounded-[10px] bg-blue-cta px-8 py-2 text-white hover:bg-blue-highlight'
              type='submit'
            >
              Submit
            </button>
            <button
              type='submit'
              className='text-end underline hover:scale-[1.05]'
            >
              Skip this step
            </button>
          </span>
        </form>

        <span className='flex justify-end'></span>
      </section>
    </div>
  );
};

export default Steps;
