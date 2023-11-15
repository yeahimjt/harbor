import { firestore } from '@/app/firebase';
import {
  collection,
  doc,
  documentId,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

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

export async function userStatusUpdate(id: string) {
  try {
    if (!id) {
      console.log('invalid id');
      return;
    }

    // Get user doc
    const userDoc = doc(firestore, 'users', id);
    const userUpdated = updateDoc(userDoc, { setup: true });
  } catch (error) {
    console.error('Error updating user status:', error);
    // Handle the error or rethrow it if needed
    throw error;
  }
}
