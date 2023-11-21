// import * as admin from 'firebase-admin';
// import { NextResponse } from 'next/server';

// export async function GET(req: Request, res: Response) {
//   const { searchParams } = new URL(req.url);
//   const code = searchParams.get('code');
//   // Check if 'code' exists
//   if (!code) {
//     return NextResponse.json(
//       { error: 'Missing code parameter' },
//       { status: 400 }
//     );
//   }
//   const authString = Buffer.from(
//     `${String(process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID)}:${String(
//       process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_SECRET
//     )}`
//   ).toString('base64');

//   // Use it in your code
//   const params = new URLSearchParams();
//   params.append('code', code[0]);
//   // Change this to be the base of vercel app
//   params.append(
//     'redirect_uri',
//     String(process.env.NEXTAUTH_URL + '/api/auth/callback/spotify')
//     // 'https://localhost:3000/api/auth/callback/spotify'
//   );
//   params.append('grant_type', 'client_credentials');
//   const body = params.toString();

//   const headers = {
//     authorization: `Basic ${authString}`,
//     'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
//   };
//   try {
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//       method: 'POST',
//       headers,
//       body,
//     });

//     const data = await response.json();
//     const { access_token, refresh_token } = data;
//     const spotifyResponse = await fetch('https://api.spotify.com/v1/me', {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     });
//     const spotifyUserProfile = await spotifyResponse.json();
//     console.log('this is my spotify user: ', spotifyUserProfile);
//     const id = spotifyUserProfile.id;
//     const product = spotifyUserProfile.product;
//     const firebase_token = await admin.auth().createCustomToken(id);
//     return NextResponse.json(
//       { access_token, refresh_token, firebase_token, product },
//       { status: 200 }
//     );
//   } catch (err: any) {
//     console.error('Error while requesting a token', err.response.data);
//     return NextResponse.json({ error: err.message }, { status: 500 });
//   }
// }
