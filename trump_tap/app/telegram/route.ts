import { NextResponse } from 'next/server';

export async function POST(req: Request) { // Specify the type for req
  try {
    const update = await req.json();
    console.log('Received update:', update); // Log incoming update

    if (update.message) {
      const chatId: number = update.message.chat.id; // Specify chatId type
      const text: string = update.message.text; // Specify text type
      console.log('Chat ID:', chatId, 'Text:', text); // Log chat ID and message text

      if (text === '/start') {
        await sendMessage(chatId, 'Welcome to the Trump Mini App! Click the avatar to react!');
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error processing update:', error); // Log any errors
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

async function sendMessage(chatId: number, text: string) { // Specify parameter types
  const url = `https://api.telegram.org/bot7547947333:AAGBDT9f39o9xRtIVFyWPe9mJbo2nlHcKak/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
  });
}