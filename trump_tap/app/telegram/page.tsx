// app/web-app/page.tsx
import React from 'react';

const WebAppPage: React.FC = () => {
  const [reaction, setReaction] = React.useState<string | null>(null);

  const handleClick = async () => {
    try {
      const response = await fetch('/api/get-reaction');
      const data = await response.json();
      setReaction(data.reaction);
    } catch (error) {
      console.error('Error fetching reaction:', error);
      setReaction('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#ff4500' }}>Donald Trump Mini App</h1>
      <p>Click the avatar to see reactions!</p>
      <button onClick={handleClick} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Click the Avatar!
      </button>
      {reaction && <p>{reaction}</p>}
    </div>
  );
};

export default WebAppPage;
