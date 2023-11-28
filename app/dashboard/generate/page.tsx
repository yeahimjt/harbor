'use client';
import DashNav from '@/app/components/dashnav';
import PageTitle from '@/app/components/pagesections/pagetitle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  decrementUsersGenerationsRemaining,
  generateBio,
  getUserPreferences,
  getUsersGenerationsRemaining,
  handleUserUploadPlaylist,
  userWantsSync,
} from '@/lib/utils/index';
import { InfoIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [toggled, setToggled] = useState<boolean>(false);
  const [context, setContext] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [generationsRemaining, setGenerationsRemaining] = useState<
    number | null
  >(null);
  useEffect(() => {
    async function handleGenerationsRemaining() {
      const generations = await getUsersGenerationsRemaining(session!.user.uid);
      setGenerationsRemaining(generations);
    }
    if (session) {
      handleGenerationsRemaining();
    }
  }, [session]);
  const [userPreferences, setUserPreferences] = useState<
    | {
        context: string;
        genres: string;
      }
    | undefined
    | null
  >(null);
  const handlePlaylistGeneration = async () => {
    if (generationsRemaining === 0) {
      return;
    }
    setLoading(true);
    if (toggled) {
      const preferences = await getUserPreferences(session!.user.uid);
      setUserPreferences(preferences);
      const prompt = `Generate 1 playlist. The user has said they enjoy these genres: ${userPreferences?.genres}. If the array is empty that means they did not enter anything and you should not worry about what you recommend to them as they should generally like anything. If the array is not empty they entered genres they prefer for you to recommend. Here is more context that the user has provided for you to help you for your recommendations: (${userPreferences?.context}). If no context is present then you should not worry about it. In all cases never just recommend music from a particular artist unless they specify it!. Always try and include other artists that are similar to the genre/context that the users provides. Please return the playlists in JSON format: {playlists: [{playlistName: string, tracks:[{title, artist}, {title,artist}]}]}. Always generate at least 5 songs for the playlists. Title is the title of the song artist is the artist of the song. Here is context they additionally provided to possibly help: ${context}`;
      const response = await generateBio(
        prompt,
        session!.user.uid,
        session!.accessToken
      );
      if (response) {
        setLoading(false);
        const generations = await decrementUsersGenerationsRemaining(
          session!.user.uid
        );
        if (generations) {
          setGenerationsRemaining(generations);
        }
        const sync = await userWantsSync(session!.user.uid);
        if (sync) {
          handleUserUploadPlaylist(
            session!.user.uid,
            response,
            session!.accessToken,
            session!.user.id
          );
          return;
        }
        router.push(`/dashboard/playlists-generated/${response}`);
      }
    } else {
      const prompt = `Generate 1 playlist using this context: ${context}. If no context is present then you should not worry about it. In all cases never just recommend music from a particular artist unless they specify it!. Always try and include other artists that are similar to the genre/context that the users provides. Please return the playlists in JSON format: {playlists: [{playlistName: string, tracks:[{title, artist}, {title,artist}]}]}. Always generate at least 5 songs for the playlists. Title is the title of the song artist is the artist of the song.`;
      const response = await generateBio(
        prompt,
        session!.user.uid,
        session!.accessToken
      );
      if (response) {
        setLoading(false);

        const generations = await decrementUsersGenerationsRemaining(
          session!.user.uid
        );
        if (generations) {
          setGenerationsRemaining(generations);
        }
        const sync = await userWantsSync(session!.user.uid);
        if (sync) {
          handleUserUploadPlaylist(
            session!.user.uid,
            response,
            session!.accessToken,
            session!.user.id
          );
          return;
        }
        router.push(`/dashboard/playlists-generated/${response}`);
      }
    }
  };
  return (
    <div className='page-container'>
      <DashNav />
      <section className='page-section'>
        <PageTitle title='Generate' />
        <div className='space-y-4'>
          <div className='flex items-center space-x-2'>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <InfoIcon />
                </TooltipTrigger>
                <TooltipContent className='w-[200px]'>
                  {toggled
                    ? 'You are currently going to be creating a playlist with context you have previously provided us with on your account. Toggle off to avoid this.'
                    : 'You are currently going to be creating a playlist from scratch. Your preferences will not be used in the decision making for this new playlist. Toggle on to utilize your stored preferences.'}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Switch
              id='preferences'
              onCheckedChange={() => setToggled(!toggled)}
            />
            <Label htmlFor='preferences'>Preferences</Label>
          </div>
          <span className='flex gap-4'>
            <Input
              onChange={(e: any) => setContext(e.target.value)}
              placeholder='Tell us your vibe, mood, or favorite artists.'
            />
            <Button
              type='button'
              disabled={
                context && !loading && generationsRemaining! > 0 ? false : true
              }
              onClick={() => handlePlaylistGeneration()}
            >
              {loading ? 'Generating...' : 'Generate'}
            </Button>
          </span>
          <h3 className='text-[14px] text-my-mid-gray'>
            You have {generationsRemaining} playlist generations remaining
          </h3>
        </div>
      </section>
    </div>
  );
};

export default Page;
