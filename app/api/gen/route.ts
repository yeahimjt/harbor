import { firestore } from '@/app/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

interface Song {
  title: string;
  artist: string;
}

interface OpenAIResponse {
  songs: Song[];
  playlists: {
    [playlistName: string]: Song[];
  };
}

export async function POST(req: Request) {
  const { prompt, user_id, access_token } = await req.json();

  // Create new open ai
  const client = new OpenAI({
    apiKey: String(process.env.NEXT_PUBLIC_OPENAI_API_KEY),
  });

  // Create new chat with proper context
  const response = await client.chat.completions.create({
    model: 'gpt-4-1106-preview',
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content:
          'You are a helpful assistant designed to output JSON with music recommendations',
      },
      { role: 'user', content: prompt },
    ],
  });
  if (!response || !response.choices[0].message.content) {
    return new Response('failed, no response returned');
  }
  const openAIResponse: OpenAIResponse = JSON.parse(
    response.choices[0]?.message?.content
  );
  console.log(openAIResponse);
  if (openAIResponse) {
    // Add the responses for songs and playlists to users firebase database
    // ** Not being used because of the uneccessary duplicate entries

    // const userDocRef = doc(firestore, 'users', user_id);
    // await updateDoc(userDocRef, {
    //   songs: openAIResponse.songs ?? [],
    //   playlists: openAIResponse.playlists ?? [],
    // });

    return NextResponse.json(
      {
        songs: openAIResponse.songs,
        playlists: openAIResponse.playlists,
      },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      {
        songs: [],
        playlistName: [{ playlistName: [] }],
      },
      { status: 400 }
    );
  }
  // return new Response(response.choices[0].message.content);
}
