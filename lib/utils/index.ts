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
import { CustomUser, spotifyBaseUrl } from '../types';

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

  await generateBio(prompt, userInfo.uid, access_token);
  return true;
}

export const generateBio = async (
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
    } else if (responseData && responseData.playlists) {
      const spotifyResponse = await fetch('/api/spotify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          playlists: responseData.playlists,
          access_token,
          user_id: id,
        }),
      });
      console.log(responseData);
      if (!spotifyResponse.ok) {
        throw new Error(`HTTP error! Status :${response.status}`);
      }
      return responseData.playlists[0].playlistName;
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

export async function grabSimilarSongData(seed: string, access_token: string) {
  if (!seed) {
    console.error('Missing seed');
    return null;
  }
  try {
    const response = await fetch(
      `${spotifyBaseUrl}recommendations?seed_tracks=${seed}&limit=${15}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error('Error grabbing similar song data: ', error);
  }
}

export async function grabAlbumData(id: string, access_token: string) {
  if (!id) {
    console.error('No id provided!');
    return null;
  }
  try {
    const response = await fetch(`${spotifyBaseUrl}albums/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error('Error grabbing album data: ', error);
    return null;
  }
}

export async function grabSimilarAlbumData(seed: string, access_token: string) {
  if (!seed) {
    console.error('Missing seed');
    return null;
  }
  try {
    const response = await fetch(
      `${spotifyBaseUrl}recommendations?seed_tracks=${seed}&limit=${15}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );
    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error('Error grabbing similar song data: ', error);
  }
}

export async function grabPlaylistData(id: string, access_token: string) {
  if (!id) {
    console.error('No id provided!');
    return null;
  }
  try {
    const response = await fetch(`${spotifyBaseUrl}playlists/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error('Error grabbing playlist data: ', error);
    return null;
  }
}

export async function grabPlaylistGeneratedData(
  playlistName: string,
  user_id: string
) {
  if (!playlistName) {
    console.error('No playlist name provided!');
    return;
  }

  try {
    const usersCollection = collection(firestore, 'users');
    const q = query(usersCollection, where(documentId(), '==', user_id));
    const usersData = await getDocs(q);

    if (usersData.empty) {
      console.log('user was not found');
      return;
    }

    const playlists = usersData.docs[0].data().playlists;
    const playlist = playlists.find(
      (item: any) => item.playlistName === playlistName
    );
    if (playlist) {
      return playlist;
    } else {
      return null;
    }
  } catch (error: any) {
    console.error('Error grabbing generated playlist data: ', error);
    return null;
  }
}

export async function grabArtistAlbums(id: string, access_token: string) {
  if (!id) {
    console.error('No id provided!');
    return null;
  }
  try {
    const response = await fetch(
      `${spotifyBaseUrl}artists/${id}/albums?include_groups=album&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    const responseData = await response.json();
    return responseData;
  } catch (error: any) {
    console.error('Error grabbing playlist data: ', error);
    return null;
  }
}

export async function getUserPreferences(user_id: string) {
  if (!user_id) {
    console.error('No user id provided');
    return;
  }
  try {
    const userDoc = doc(firestore, 'users', user_id);
    const userDocSnap = await getDoc(userDoc);
    if (userDocSnap.exists()) {
      const genres = userDocSnap.data().genres;
      const context = userDocSnap.data().context;
      if (genres && context) {
        return { genres: genres, context: context };
      }
    } else {
      console.error(`user does not exist`);
      return;
    }
  } catch (error: any) {
    console.error(`Error getting user preferences: `, error);
  }
}

export async function getUsersGenerationsRemaining(user_id: string) {
  if (!user_id) {
    console.error('No user id provided');
    return;
  }
  try {
    const userDoc = doc(firestore, 'users', user_id);
    const userDocSnap = await getDoc(userDoc);
    if (userDocSnap.exists()) {
      const generations = userDocSnap.data().generations_remaining;
      return generations;
    }
  } catch (error: any) {
    console.error(`Error getting user preferences: `, error);
    return;
  }
}

export async function decrementUsersGenerationsRemaining(user_id: string) {
  if (!user_id) {
    console.error('No user id provided');
    return;
  }
  try {
    const userDoc = doc(firestore, 'users', user_id);
    const userDocSnap = await getDoc(userDoc);
    if (userDocSnap.exists()) {
      const generations = userDocSnap.data().generations_remaining;
      const userDocUpdatedSnap = await updateDoc(userDoc, {
        generations_remaining: generations - 1,
      });
      return generations - 1;
    }
  } catch (error: any) {
    console.error(`Error getting user preferences: `, error);
    return;
  }
}

export async function grabUsersHarborPlaylists(user_id: string) {
  if (!user_id) {
    console.error('No user id provided');
    return;
  }
  try {
    const userDoc = doc(firestore, 'users', user_id);
    const userDocSnap = await getDoc(userDoc);
    if (userDocSnap.exists()) {
      const playlists = userDocSnap.data().playlists;
      return playlists;
    }
  } catch (error: any) {
    console.error(
      `Error grabbing users playlists generated by harbor: `,
      error
    );
  }
}
