import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const update = await req.json();
    console.log('Received update:', update); // Log incoming update

    if (update.message) {
      const chatId = update.message.chat.id;
      const text = update.message.text;
      console.log('Chat ID:', chatId, 'Text:', text); // Log chat ID and message text

      if (text === '/start') {
        // URL to your web app
        const webAppUrl = 'https://trumptap-git-main-ziggy-s-projects.vercel.app/web-app'; // Update this with the correct path

        // Send welcome message with link to the web app
        await sendMessage(chatId, `Welcome to the Trump Mini App! Click here to open the app: ${webAppUrl}`);
      }
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error processing update:', error); // Log any errors
    return NextResponse.json({ status: 'error' }, { status: 500 });
  }
}

async function sendMessage(chatId: number, text: string) {
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
