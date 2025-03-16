import { useEffect, useState } from 'react';
import { authenticateWithPi } from '../utils/piAuth';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeUser = async () => {
      const storedUser = localStorage.getItem('piUser');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        const authenticatedUser = await authenticateWithPi();
        if (authenticatedUser) {
          localStorage.setItem('piUser', JSON.stringify(authenticatedUser));
          setUser(authenticatedUser);
        }
        setLoading(false);
      }
    };

    initializeUser();
  }, []);

  const handleLogin = async () => {
    const authenticatedUser = await authenticateWithPi();
    if (authenticatedUser) {
      localStorage.setItem('piUser', JSON.stringify(authenticatedUser));
      setUser(authenticatedUser);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h2>Loading your Pi profile...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 Welcome to Pi Freelance Hub</h1>
      {user ? (
        <div>
          <p>✅ <strong>Logged in as:</strong> {user.username}</p>
          <nav>
            <ul>
              <li><a href="/jobs">🛠️ Browse & Post Jobs</a></li>
              <li><a href="/profile">👤 My Profile</a></li>
              <li><a href="/chat">💬 Chat with Freelancers</a></li>
              <li><a href="/reviews">⭐ View Reviews</a></li>
              <li><a href="/privacy-policy">📄 Privacy Policy</a></li>
              <li><a href="/terms-of-service">📃 Terms of Service</a></li>
            </ul>
          </nav>
        </div>
      ) : (
        <button onClick={handleLogin}>Login with Pi</button>
      )}
    </div>
  );
}
