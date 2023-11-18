import { firestore } from '@/app/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { OpenAI } from 'openai';

export async function POST(req: Request) {
  const { prompt, user_id } = await req.json();

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
  console.log(response.choices[0].message.content);
  if (!response || response.choices.length !== 0) {
    return new Response('failed');
  }
  const content = response.choices[0]?.message?.content;
  const contentObject = content as
    | { songs?: any[]; playlists?: any[] }
    | undefined;
  if (contentObject) {
    const userDocRef = doc(firestore, 'users', user_id);
    const updatedDoc = await updateDoc(userDocRef, {
      songs: contentObject.songs ?? [],
      playlists: contentObject.playlists ?? [],
    });
    console.log('updated');
    return new Response('success');
  } else if (typeof content === 'string') {
    // Handle the case where content is a string
    console.warn('Unexpected content type: string');
    return new Response('failed');
  } else {
    // Handle other unexpected cases
    return new Response('failed');
  }

  // return new Response(response.choices[0].message.content);
}
