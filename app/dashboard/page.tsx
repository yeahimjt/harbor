'use client';
import React, { useEffect, useState } from 'react';
import {
  grabUserInfo,
  initializeRecommendations,
  userStatusUpdate,
} from '@/lib/utils/index';
import Content from './content';
import Steps from './steps';
import { CustomUser } from '@/lib/types';
import { useSession } from 'next-auth/react';
const Page = () => {
  // Grab user from stored session
  // const [user] = useAuthState(auth);
  const { data: session } = useSession();
  // State for if user has completed account setup for preferences
  const [userSetupCompleted, setUserSetupCompleted] = useState<boolean | null>(
    null
  );
  const [userInfo, setUserInfo] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Check if user has setup their preferences
  useEffect(() => {
    async function checkSetupCompleted() {
      const userGrabbed = await grabUserInfo(session!.user!.uid);
      if (userGrabbed) {
        setUserInfo(userGrabbed);
        userGrabbed.setup
          ? setUserSetupCompleted(true)
          : setUserSetupCompleted(false);
      }
    }
    if (session && session.user) {
      checkSetupCompleted();
    }
  }, [session]);

  // Handler for submitting (OR SKIPPING) initial step if user has not done so yet
  // Initialize their account with singles/playlists
  async function onSubmit(e: any) {
    e.preventDefault();
    setLoading(true);
    const recommendations = await initializeRecommendations(
      userInfo,
      session!.accessToken
    );
    if (recommendations) {
      setLoading(false);
      setUserSetupCompleted(true);
      userStatusUpdate(userInfo!);
    }
  }

  return (
    <>
      {userSetupCompleted === false ? (
        <Steps
          onSubmit={onSubmit}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          loading={loading}
        />
      ) : (
        <>
          <Content />
        </>
      )}
    </>
  );
};

export default Page;
