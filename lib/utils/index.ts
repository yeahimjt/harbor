import { firestore } from '@/app/firebase';
import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { CustomUser, spotifyBaseUrl } from '../constants';

export async function checkUserStatus(id: string) {
  try {
    if (!id) {
      console.log('invalid id');
      return;
    }

    // Query for user
    const usersCollection = collection(firestore, 'users');
    const q = query(usersCollection, where(documentId(), '==', id));
    const usersData = await getDocs(q);

    if (usersData.empty) {
      console.log('user was not found');
      return;
    }

    // Querying with a unique identifier, so the first result will always be the intended user
    // Return boolean value if setup is found
    return !!usersData.docs[0].data().setup;
  } catch (error) {
    console.error('Error checking user status:', error);
    // Handle the error or rethrow it if needed
    throw error;
  }
}

export async function userStatusUpdate(userInfo: CustomUser) {
  try {
    console.log(userInfo);
    if (!userInfo || !userInfo.uid) {
      console.log('Invalid user information or user ID');
      return;
    }

    // Get user doc
    const userDoc = doc(firestore, 'users', userInfo.uid);
    const userUpdated = updateDoc(userDoc, {
      setup: true,
      context: userInfo.context,
      genres: userInfo.genres,
      displayName: userInfo.displayName,
    });
  } catch (error) {
    console.error('Error updating user status:', error);
    // Handle the error or rethrow it if needed
    throw error;
  }
}

export async function grabUserInfo(id: string) {
  console.log(id);
  try {
    if (!id) {
      console.log('invalid id');
      return;
    }

    // Get user doc
    const userDocRef = doc(firestore, 'users', id);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      console.log(userDocSnap.data());
      // return userDocSnap.data();
      return {
        context: userDocSnap.data().context,
        genres: userDocSnap.data().genres,
        setup: userDocSnap.data().setup,
        displayName: userDocSnap.data().displayName,
        email: userDocSnap.data().email,
        uid: userDocSnap.data().uid,
        photoURL: userDocSnap.data().photoURL || null,
      };
    }
  } catch (error) {
    console.error('Error grabbing user info:', error);
  }
}

export async function grabUserListenNow(id: string) {
  try {
    if (!id) {
      console.log('invalid id');
      return;
    }

    // Get user songs/playlists
    const userDocRef = doc(firestore, 'users', id);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      return {
        playlists: userDocSnap.data().playlists || null,
        songs: userDocSnap.data().songs || null,
      };
    }
  } catch (error) {
    console.error('Error grabbing user info:', error);
  }
}

export async function initializeRecommendations(
  userInfo: CustomUser | null,
  access_token: string
) {
  // User info can never be null, but check anyways
  if (!userInfo) {
    console.log('User sent is null');
    return;
  }
  const prompt = `Generate 5 songs and 1 playlists. The user has said they enjoy these genres: ${userInfo.genres}. If the array is empty that means they did not enter anything and you should not worry about what you recommend to them as they should generally like anything. If the array is not empty they entered genres they prefer for you to recommend. Here is more context that the user has provided for you to help you for your recommendations: (${userInfo.context}). If no context is present then you should not worry about it. In all cases never just recommend music from a particular artist unless they specify it!. Always try and include other artists that are similar to the genre/context that the users provides. Please return the songs in JSON format: {title,artist} and playlists in JSON format: {playlist: [{playlistName: string, tracks:[{title, artist}, {title,artist}]}]}. Always generate at least 5 songs for the playlists. Title is the title of the song artist is the artist of the song.`;

  generateBio(prompt, userInfo.uid, access_token);
}

const generateBio = async (
  prompt: string,
  id: string,
  access_token: string
) => {
  try {
    const response = await fetch('/api/gen', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        user_id: id,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status :${response.status}`);
    }
    const responseData = await response.json();
    console.log(responseData);
    if (responseData && responseData.songs && responseData.playlists) {
      const spotifyResponse = await fetch('/api/spotify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          songs: responseData.songs,
          playlists: responseData.playlists,
          access_token,
          user_id: id,
        }),
      });

      if (!spotifyResponse.ok) {
        throw new Error(`HTTP error! Status :${response.status}`);
      }
      return true;
    } else {
      console.error('Invalid response data from /api/gen');
    }
  } catch (error: any) {
    console.error(`Error: `, error);
  }
};

export async function grabSongData(id: string, access_token: string) {
  if (!id) {
    console.error('No id provided!');
    return null;
  }
  try {
    const response = await fetch(`${spotifyBaseUrl}tracks/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error('Error grabbing song data: ', error);
    return null;
  }
}
