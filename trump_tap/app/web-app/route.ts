import { NextResponse } from 'next/server';

// Import any necessary modules, e.g., React components if needed
// For example, you could use 'react' to render your UI.

export async function GET(req: Request) {
  try {
    // Return a basic HTML page for your web app
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Trump Mini App</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 20px; }
          button { padding: 10px 20px; font-size: 16px; }
          h1 { color: #ff4500; } /* Trump orange */
        </style>
      </head>
      <body>
        <h1>Donald Trump Mini App</h1>
        <p>Click the avatar to see reactions!</p>
        <button id="reactionButton">Click the Avatar!</button>
        <p id="reactionMessage"></p>
        <script>
          document.getElementById('reactionButton').addEventListener('click', async () => {
            const response = await fetch('/api/get-reaction');
            const data = await response.json();
            document.getElementById('reactionMessage').innerText = data.reaction;
          });
        </script>
      </body>
      </html>
    `;

    return new NextResponse(htmlContent, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  } catch (error) {
    console.error('Error serving web app:', error);
    return NextResponse.json({ status: 'error', message: 'Internal Server Error' }, { status: 500 });
  }
}