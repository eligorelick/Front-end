import { useEffect, useState } from 'react';
import { authenticateWithPi } from '../utils/piAuth';

export default function Home() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleAuth = async () => {
      const storedUser = localStorage.getItem('piUser');

      if (storedUser) {
        // Automatically restore the saved user session
        setUser(JSON.parse(storedUser));
        setLoading(false);
      } else {
        // First-time authentication via Pi SDK
        const authenticatedUser = await authenticateWithPi();

        if (authenticatedUser) {
          localStorage.setItem('piUser', JSON.stringify(authenticatedUser));
          setUser(authenticatedUser);
        }
        setLoading(false);
      }
    };

    handleAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to My Pi Hire App 🚀</h1>
      {user ? (
        <div>
          <p>✅ You're logged in as: <strong>{user.username}</strong></p>
          {/* Main app content goes here */}
        </div>
      ) : (
        <p>❌ Authentication failed or cancelled.</p>
      )}
    </div>
  );
}
