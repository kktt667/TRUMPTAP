import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const update = await req.json();
    console.log('Received update:', update); // Log incoming update

    if (update.message) {
      const chatId: number = update.message.chat.id; // Specify chatId type
      const text: string = update.message.text; // Specify text type
      console.log('Chat ID:', chatId, 'Text:', text); // Log chat ID and message text

      if (text === '/start') {
        // Send the welcome message first
        await sendMessage(chatId, 'Welcome to the Trump Mini App! Click the avatar to react!');
        
        // Then send the link to the mini app
        const miniAppLink = 'https://trumptap-git-main-ziggy-s-projects.vercel.app/web-app';
        await sendMessage(chatId, `Open the app here: ${miniAppLink}`);
      }
    }

    return NextResponse.json({ status: 'ok' }); // Respond with status 'ok'
  } catch (error) {
    console.error('Error processing update:', error); // Log any errors
    return NextResponse.json({ status: 'error' }, { status: 500 }); // Respond with error status
  }
}

// Function to send a message back to the user
async function sendMessage(chatId: number, text: string) {
  const url = `https://api.telegram.org/bot<YOUR_TELEGRAM_BOT_TOKEN>/sendMessage`; // replace <YOUR_TELEGRAM_BOT_TOKEN> with actual token
  try {
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
    console.log('Message sent:', text); // Log message confirmation
  } catch (error) {
    console.error('Error sending message:', error); // Log fetch errors
  }
}

