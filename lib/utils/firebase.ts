import * as admin from 'firebase-admin';
interface FirebaseAdminAppParams {
  projectId: string;
  clientEmail: string;
  storageBucket: string;
  privateKey: string;
}

// Initializing seperate admin sdk for server
function formatPrivateKey(key: string) {
  return key.replace(/\\n/g, '\n');
}

export function createFirebaseAdminApp(params: FirebaseAdminAppParams) {
  const privateKey = formatPrivateKey(params.privateKey);
  if (admin.apps.length > 0) {
    return admin.app();
  }

  const cert = admin.credential.cert({
    projectId: params.projectId,
    clientEmail: params.clientEmail,
    privateKey,
  });
  return admin.initializeApp({
    credential: cert,
    projectId: params.projectId,
    storageBucket: params.storageBucket,
  });
}

export async function initAdmin() {
  const params = {
    projectId: String(process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID),
    clientEmail: String(process.env.FIREBASE_CLIENT_EMAIL),
    storageBucket: String(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET),
    privateKey: String(process.env.FIREBASE_PRIVATE_KEY),
  };
  return createFirebaseAdminApp(params);
}
