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
import { CustomUser } from '../constants';

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

export async function initializeRecommendations(userInfo: CustomUser | null) {
  // User info can never be null, but check anyways
  if (!userInfo) {
    console.log('User sent is null');
    return;
  }
  const prompt = `Generate 5 songs and 1 playlists. The user has said they enjoy these genres: ${userInfo.genres}. If the array is empty that means they did not enter anything and you should not worry about what you recommend to them as they should generally like anything. If the array is not empty they entered genres they prefer for you to recommend. Here is more context that the user has provided for you to help you for your recommendations: (${userInfo.context}). If no context is present then you should not worry about it. In all cases never just recommend music from a particular artist unless they specify it!. Always try and include other artists that are similar to the genre/context that the users provides. Please return the songs in JSON format: {title,artist} and playlists as {playlistName: [{title,artist},{title,artist}]}. Title is the title of the song artist is the artist of the song.`;

  generateBio(prompt, userInfo.uid);
}

const generateBio = async (prompt: string, id: string) => {
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
    throw new Error(response.statusText);
  }

  let answer = await response.json();

  console.log(answer);
};
