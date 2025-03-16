import { useState, useEffect } from 'react';

export default function Chat() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('piUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchMessages(JSON.parse(storedUser));
    } else {
      setLoading(false);
    }
  }, []);

  const fetchMessages = async (user) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    const data = await res.json();
    setMessages(data.messages);
    setLoading(false);
  };

  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ sender: user.username, content: newMessage }),
    });

    if (res.ok) {
      const message = await res.json();
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  if (loading) return <p>Loading chat...</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>💬 Pi Freelance Hub Chat</h1>

      <div style={{ marginBottom: '20px', maxHeight: '400px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.sender}:</strong> {msg.content}</p>
        ))}
      </div>

      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
